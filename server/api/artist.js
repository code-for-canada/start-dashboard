const { artistsTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes, getUserData } = require('./common')

const getArtist = async (req, res) => {
  const userEmail = req.query.email
  const permissions = req.user.permissions

  const { user, error } = await getUserData(req)

  if (error) {
     return res.status(500).send({ error })
  }

  const id = user['https://streetartoronto.ca/artist_profile_id']

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
