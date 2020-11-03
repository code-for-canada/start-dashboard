const jwtAuthz = require('express-jwt-authz');

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

module.exports = {
  methodNotImplemented,
  checkScopes
}