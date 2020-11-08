const { accountsTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes, getUserData } = require('./common')
const fetch = require('node-fetch')

const updateUser = async (req, res) => {
  const payload = {
    email: req.body.email,
    user_metadata: {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
    }
  }

  console.log("req", req)

  const auth0Id = req.user.sub.split('auth0|')[1]



  const auth0res = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0Id}`, {
    headers: { 'Authorization': req.headers.authorization }
  })

  console.log({ auth0res })

  accountsTable
    .select({ filterByFormula: `{auth0_id} = '${auth0Id}'` })
    .firstPage(async (err, records) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: err })
      }

      const accountRecord = records[0]
      const recordToUpdate = {
        id: accountRecord.id,
        fields: {
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email
        }
      }

      const updateRes = await accountsTable.update([ recordToUpdate ])
      console.log({updateRes})
    });
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'PATCH':
      updateUser(req, res)
      break
    default:
      methodNotImplemented(req, res)
  }
}
