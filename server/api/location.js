const { locationsTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes } = require('./common')

const createLocation = (req, res) => {
  const location = req.body
  locationsTable.create([location], (err, records) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }
    records.forEach(function (record) {
      return res.status(201).send({ record })
    })
  })
}

const updateLocation = (req, res) => {
  const location = req.body
  locationsTable.update([location], (err, records) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }
    records.forEach(function (record) {
      return res.status(200).send({ record })
    })
  })
}

const getLocation = (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).send({ error: "Missing location ID" })
  }

  locationsTable.find(id, (err, record) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }

    const location = { ...record.fields, id: record.id }
    return res.status(200).send({ location })
  })
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'POST':
      checkScopes(req, res, createLocation, ['is:staff'])
      break
    case 'GET':
      checkScopes(req, res, getLocation, ['is:staff'])
      break
    case 'PATCH':
      checkScopes(req, res, updateLocation, ['is:staff'])
      break
    default:
      methodNotImplemented(req, res)
  }
}
