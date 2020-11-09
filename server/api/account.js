const { accountsTable } = require('./utils/Airtable')
const { getManagementApiToken, updateUser, sendVerificationEmail } = require('./utils/Auth0')
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
    if (auth0UpdateResult.status !== 200) {
      console.log({auth0UpdateResult})
      return res.status(500).send({ error: `Unable to update user data on Auth0: Failed with status ${auth0UpdateResult.status}` })
    }

    if (req.user.email !== req.body.email) {
      const verificationEmailRes = await sendVerificationEmail(req.user.sub)
      if (verificationEmailRes.status !== 201) {
        console.log({verificationEmailRes})
        return res.status(500).send({ error: `Unable to send email verification email on Auth0: Failed with status ${verificationEmailRes.status}` })
      }
    }

    const records = await accountsTable
      .select({ filterByFormula: `{auth0_id} = '${req.user.sub}'` })
      .firstPage();

    if (records.length === 0) {
      return res.status(500).send({ error: 'There is no Airtable record associated with this account ID' })
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
  } catch (err) {
    console.log("Error updating account", err)
    return res.status(500).send({ error: `Unable to update user data on Airtable: ${err.message}` })
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
