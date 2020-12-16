const { reportsTable } = require('./utils/Airtable')
const { methodNotImplemented } = require('./common')

const getReports = async (req, res) => {
  try {
    const records = await reportsTable.select().firstPage()
    const items = records.map(rec => ({ ...rec.fields, id: rec.id }))
    return res.status(200).send({ items })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ error: err.message })
  }
}

const getReportById = async (req, res) => {
  try {
    const { id } = req.query
    const record = await reportsTable.find(id)
    return res.status(200).send({ record: { ...record.fields, id: record.id } })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ error: err.message })
  }
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'GET':
      const { id } = req.query
      if (id) {
        getReportById(req, res)
      } else {
        getReports(req, res)
      }
      break
    default:
      methodNotImplemented(req, res)
  }
}
