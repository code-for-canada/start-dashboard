const jwtAuthz = require('express-jwt-authz');
const fetch = require('node-fetch')

const methodNotImplemented = (req, res) => {
  return res
    .status(501)
    .send({
      message: `Unsupported method: ${req.method}`
    })
}

const checkScopes = (req, res, next, scopes, opts={}) => {
  const defaultOpts = { customScopeKey: 'permissions', failWithError: true }
  const check = jwtAuthz(scopes, {...defaultOpts, ...opts})

  check(req, res, (err) => {
    if (err) {
      return res
        .status(err.statusCode)
        .send({
          error: err.message
        })
    }
    next(req, res)
  })
}

// must pass through the auth token on the request
const getUserData = async (req) => {
  try {
    const userRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
      headers: { 'Authorization': req.headers.authorization }
    })

    if (userRes.status !== 200) {
      return { error: 'Unable to retrieve user data from Auth0' }
    }

    const userinfo = await userRes.json()
    return userinfo
  } catch (err) {
    return { error: err.message }
  }
}

module.exports = {
  methodNotImplemented,
  checkScopes,
  getUserData
}