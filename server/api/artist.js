const { artistsTable } = require('./utils/Airtable')
const { methodNotImplemented } = require('./common')
const jwtAuthz = require('express-jwt-authz');

const getArtist = (req, res) => {
  const userEmail = req.query.email;
  const permissions = req.user.permissions
  console.log("permissions", permissions)

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
      const checkScopes = jwtAuthz([ 'is:staff', 'is:artist' ], {customScopeKey: 'permissions'});
      checkScopes(req, res, () => getArtist(req,res))
      break
    default:
      methodNotImplemented(req, res)
  }
}
