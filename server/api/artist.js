const { artistsTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes } = require('./common')

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
      const scopes = [ 'is:staff', 'is:artist' ]
      checkScopes(req, res, getArtist, scopes)
      break
    default:
      methodNotImplemented(req, res)
  }
}
