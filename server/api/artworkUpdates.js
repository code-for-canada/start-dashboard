const { artworkUpdatesTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes } = require('./common')


const updateArtworkUpdate = (req, res) => {
  const update = req.body
  artworkUpdatesTable.update([update], (err, records) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }
    return res.status(200).send({ records })
  })
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'PATCH':
      checkScopes(req, res, updateArtworkUpdate, ['is:staff'])
      break
    default:
      methodNotImplemented(req, res)
  }
}
