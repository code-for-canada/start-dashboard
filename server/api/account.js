const { accountsTable } = require('./utils/Airtable')
const { getManagementApiToken, updateUser } = require('./utils/Auth0')
const { methodNotImplemented, checkScopes, getUserData } = require('./common')
const fetch = require('node-fetch')

const updateAccount = async (req, res) => {
  const payload = {
    email: req.body.email,
    user_metadata: {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
    }
  }

  try {
    const auth0UpdateResult = await updateUser(req.user.sub, payload)
    console.log({auth0UpdateResult})
    if (auth0UpdateResult.status !== 200) {
      return res.status(500).send({ error: `Unable to update user data on Auth0: Failed with status ${auth0UpdateResult.status}` })
    }

    const auth0Id = req.user.sub.split('auth0|')[1]

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

        const updatedRecord = await accountsTable.update([ recordToUpdate ])
        return res.status(200).send({ record: updatedRecord })
      });
  } catch (err) {
    return res.status(500).send({ error: err })
  }
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'PATCH':
      updateAccount(req, res)
      break
    default:
      methodNotImplemented(req, res)
  }
}
