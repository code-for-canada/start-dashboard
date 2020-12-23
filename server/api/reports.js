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

const getReportBySlug = async (req, res) => {
  try {
    const { slug } = req.query
    const records = await reportsTable
      .select({ filterByFormula: `{slug} = '${slug}'` })
      .firstPage()

    if (records.length === 0) {
      return res.status(500).send({
        error: 'There is no report at this URL. Please check your link and try again!'
      })
    }

    const report = records[0]

    return res.status(200).send({ record: { ...report.fields, id: report.id } })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ error: err.message })
  }
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'GET':
      const { slug } = req.query
      if (slug) {
        getReportBySlug(req, res)
      } else {
        getReports(req, res)
      }
      break
    default:
      methodNotImplemented(req, res)
  }
}
