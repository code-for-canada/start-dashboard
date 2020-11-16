const fetch = require('node-fetch')

const getManagementApiToken = async () => {
  const authParams = {
      "audience": process.env.AUTH0_ADMIN_API_IDENTIFIER,
      "grant_type": "client_credentials",
      "client_id": process.env.AUTH0_ADMIN_CLIENT_ID,
      "client_secret": process.env.AUTH0_ADMIN_CLIENT_SECRET,
    }

  const tokenResult = await fetch(process.env.AUTH0_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authParams)
  })

  const data = await tokenResult.json()
  const token = data.access_token
  return token
}

const updateUser = async (id, payload) => {
  const token = await getManagementApiToken()

  const auth0res = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  return auth0res
}

const deleteUser = async (id) => {
  const token = await getManagementApiToken()

  const auth0res = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  return auth0res
}

const sendVerificationEmail = async (id) => {
  const token = await getManagementApiToken()
  const userId = id.split('auth0|')[1]
  const payload = {
    "user_id": id,
    "client_id": process.env.AUTH0_CLIENT_ID,
  }

  const auth0res = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/jobs/verification-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  return auth0res
}

module.exports = { getManagementApiToken, updateUser, sendVerificationEmail, deleteUser }
