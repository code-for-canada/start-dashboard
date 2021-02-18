const { reportResponsesTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes } = require('./common')

const getResponse = (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).send({ error: "Missing response ID" })
  }

  reportResponsesTable.find(id, (err, record) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }

    console.log({record})
    console.log({err})

    const response = { ...record.fields, id: record.id }
    return res.status(200).send({ record: response })
  })
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'GET':
      return checkScopes(req, res, getResponse, ['is:staff', 'is:artist'])
      break
    default:
      methodNotImplemented(req, res)
  }
}
