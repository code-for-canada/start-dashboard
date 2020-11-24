const { artistsTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes, getUserData } = require('./common')

const getArtist = async (req, res) => {
  const userEmail = req.query.email
  const permissions = req.user.permissions
  const userData = await getUserData(req)

  if (permissions.includes('is:artist')) {
    if (!userData.email_verified) {
      return res.status(403).send({
        error: 'Your email address is not verified.'
      })
    }
  }

  const id = userData['https://streetartoronto.ca/artist_profile_id']
  artistsTable.find(id, (err, record) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err })
    }
    return res.status(200).send({ record: record })
  })
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'GET':
      checkScopes(req, res, getArtist, ['is:staff', 'is:artist'])
      break
    default:
      methodNotImplemented(req, res)
  }
}
