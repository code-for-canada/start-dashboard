const jwtAuthz = require('express-jwt-authz')
const fetch = require('node-fetch')
const { getUser } = require('./utils/Auth0')

const methodNotImplemented = (req, res) => {
  return res.status(501).send({
    message: `Unsupported method: ${req.method}`
  })
}

const checkScopes = (req, res, next, scopes, opts = {}) => {
  const defaultOpts = { customScopeKey: 'permissions', failWithError: true }
  const check = jwtAuthz(scopes, { ...defaultOpts, ...opts })

  check(req, res, err => {
    if (err) {
      return res.status(err.statusCode).send({
        error: err.message
      })
    }
    next(req, res)
  })
}

// must pass through the auth token on the request
const getUserData = async req => {
  if (req.startUser) {
    return { user: req.startUser }
  }

  try {
    const data = await getUser(req.headers.authorization)
    return data
  } catch (err) {
    return { error: err.message }
  }
}

module.exports = {
  methodNotImplemented,
  checkScopes,
  getUserData
}
