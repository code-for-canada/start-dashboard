const { artworksTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes } = require('./common')

const createArtwork = (req, res) => {
  const artwork = req.body
  artworksTable.create([artwork], (err, records) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }
    records.forEach(function (record) {
      return res.status(201).send({ record })
    })
  })
}

const updateArtwork = (req, res) => {
  const artwork = req.body
  artworksTable.update([artwork], (err, records) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }
    records.forEach(function (record) {
      return res.status(200).send({ record })
    })
  })
}

const getArtwork = (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).send({ error: "Missing artwork ID" })
  }

  artworksTable.find(id, (err, record) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }

    const artwork = { ...record.fields, id: record.id }
    return res.status(200).send({ artwork })
  })
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'POST':
      checkScopes(req, res, createArtwork, ['is:staff'])
      break
    case 'GET':
      checkScopes(req, res, getArtwork, ['is:staff'])
      break
    case 'PATCH':
      checkScopes(req, res, updateArtwork, ['is:staff'])
      break
    default:
      methodNotImplemented(req, res)
  }
}
