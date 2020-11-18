const { artistsTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes, getUserData } = require('./common')

const getArtist = async (req, res) => {
  const userEmail = req.query.email
  const permissions = req.user.permissions

  if (permissions.includes('is:artist')) {
    const userData = await getUserData(req)

    if (!(userData.email_verified && userData.email === userEmail)) {
      return res
        .status(403)
        .send({
          error: 'You are not authorized to see this profile.'
        })
    }
  }

  artistsTable
    .select({ filterByFormula: `{email} = '${userEmail}'` })
    .firstPage((err, records) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: err })
      }
      return res.status(200).send({ records: records })
    })
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
