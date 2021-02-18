require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const cors = require('cors')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const getUserData = require('./api/common').getUserData

const isDev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000

const openCors = {
  origin: '*',
  optionsSuccessStatus: 200
}

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.DASHBOARD_API_IDENTIFIER,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

const checkEmailVerified = async (req, res, next) => {
  const { user, error, reset } = await getUserData(req)

  if (user && user.email_verified) {
    req.startUser = user
    return next()
  }

  if (error) {
    return res.status(401).send({ error, reset })
  }

  res.status(401).send({ error: 'Your email address is not verified' })
}

const forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    )
  })
} else {
  const morgan = require('morgan')
  const app = express()

  const handleLocations = require('./api/location')
  const handleArtist = require('./api/artist')
  const handleForms = require('./api/forms')
  const handleApplications = require('./api/applications')
  const handleAccount = require('./api/account')
  const handleEmailTemplates = require('./api/emails')
  const handleArtworks = require('./api/artworks')
  const handleArtworkUpdates = require('./api/artworkUpdates')
  const handleReports = require('./api/reports')
  const handleResponses = require('./api/reportResponses')


  // Log requests with dev template
  app.use(morgan('dev'))

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

  // Answer API requests.
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.all('/api/location', checkJwt, checkEmailVerified, handleLocations)
  app.all('/api/artist', checkJwt, checkEmailVerified, handleArtist)
  app.all('/api/forms', cors(openCors), handleForms)
  app.all('/api/applications', checkJwt, checkEmailVerified, handleApplications)
  app.all('/api/reports', handleReports)
  app.all('/api/account', checkJwt, checkEmailVerified, handleAccount)
  app.all(
    '/api/email-templates',
    cors(openCors),
    checkJwt,
    handleEmailTemplates
  )
  app.all('/api/artworks', checkJwt, handleArtworks)
  app.all('/api/artwork-updates', checkJwt, handleArtworkUpdates)
  app.all('/api/report-responses', checkJwt, handleResponses)

  // Only in production is the server the main entry point,
  // so only then serve built static files from filesystem.
  //
  // (In development, React files are served by webpack-dev-server
  // from memory, which also proxies the API. See: `src/setupProxy.js` )
  if (process.env.NODE_ENV === 'production') {
    // redirect from http to https
    app.use(forceSsl)

    // Serve any static files
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

    // Handle React routing, return all other requests to React app
    app.get('*', function (req, res) {
      res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
    })
  }

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? 'dev server' : 'cluster worker ' + process.pid
      }: listening on port ${PORT}`
    )
  })
}
