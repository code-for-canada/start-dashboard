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
      return res.status(201).send({ recordId: record.getId() })
    })
  })
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'POST':
      checkScopes(req, res, createLocation, ['is:staff'])
      break
    case 'GET':
      res.send('hello')
      break
    default:
      methodNotImplemented(req, res)
  }
}
