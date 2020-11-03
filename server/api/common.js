const methodNotImplemented = (req, res) => {
  return res
    .status(501)
    .send({
        message: `Unsupported method: ${req.method}`
    })
}

module.exports = {
  methodNotImplemented
}