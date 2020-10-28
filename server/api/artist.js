const { artistsTable } = require('./utils/Airtable')
const { methodNotImplemented } = require('./common')

const getArtist = (req, res) => {
  const userEmail = req.query.email;
  artistsTable
    .select({ filterByFormula: `{email} = '${userEmail}'` })
    .firstPage((err, records) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: err })
      }
      return res.status(200).send({ records: records })
    });
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'GET':
      getArtist(req, res)
      break
    default:
      methodNotImplemented(req, res)
  }
}
