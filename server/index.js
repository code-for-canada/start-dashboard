require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const auth0 = require('auth0');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

var AuthenticationClient = require('auth0').AuthenticationClient;

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://start-dashboard.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://dashboard.streetartoronto.ca/',
  issuer: `https://start-dashboard.us.auth0.com/`,
  algorithms: ['RS256']
});

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  const handleLocations = require('./api/location')
  const handleArtist = require('./api/artist')
  const handleForms = require('./api/forms')

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.all('/api/location', checkJwt, handleLocations)
  app.all('/api/artist', checkJwt, handleArtist)
  app.all('/api/forms', handleForms)

  // Only in production is the server the main entry point,
  // so only then serve built static files from filesystem.
  //
  // (In development, React files are served by webpack-dev-server
  // from memory, which also proxies the API. See: `src/setupProxy.js` )
  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    // Handle React routing, return all other requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });
  }

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}

