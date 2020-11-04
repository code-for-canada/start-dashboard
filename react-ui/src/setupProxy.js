const { createProxyMiddleware } = require('http-proxy-middleware')

// This file overrides CRA's simple proxying, which doesn't
// easily allow proxied /api endpoints to be viewable in browser.
// See: https://stackoverflow.com/a/40897087/504018
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://start-dashboard:8080',
      changeOrigin: true
    })
  )
}