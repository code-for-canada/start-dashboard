const fetch = require('node-fetch')
let rateLimitRemaining = 2
let rateLimitReset = +new Date() / 1000

const getManagementApiToken = async () => {
  const authParams = {
    audience: process.env.AUTH0_ADMIN_API_IDENTIFIER,
    grant_type: 'client_credentials',
    client_id: process.env.AUTH0_ADMIN_CLIENT_ID,
    client_secret: process.env.AUTH0_ADMIN_CLIENT_SECRET
  }

  const tokenResult = await fetch(process.env.AUTH0_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authParams)
  })

  const data = await tokenResult.json()
  const token = data.access_token
  return token
}

const updateUser = async (id, payload) => {
  const token = await getManagementApiToken()

  const auth0res = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
  )

  return auth0res
}

const deleteUser = async id => {
  const token = await getManagementApiToken()

  const auth0res = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )

  return auth0res
}

const sendVerificationEmail = async id => {
  const token = await getManagementApiToken()
  const payload = {
    user_id: id,
    client_id: process.env.AUTH0_CLIENT_ID
  }

  const auth0res = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/jobs/verification-email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
  )

  return auth0res
}

const getUser = async token => {
  const url = `https://${process.env.AUTH0_DOMAIN}/userinfo`
  console.log(`Fetching user info from ${`https://${process.env.AUTH0_DOMAIN}/userinfo`}`)

  const res = await fetch(
    url,
    { headers: { Authorization: token } }
  )

  rateLimitRemaining = parseInt(res.headers.get('x-ratelimit-remaining'))
  rateLimitReset = parseInt(res.headers.get('x-ratelimit-reset'))

  console.log({ rateLimitRemaining })
  console.log({ rateLimitReset })

  if (res.status === 429) {
    console.log("You hit the Auth0 rate limit! It resets at unix time: ", rateLimitReset)
    return { error: res.statusText, reset: rateLimitReset }
  } else if (res.status !== 200) {
    return { error: `Unable to retrieve user data from Auth0: ${res.statusText}` }
  }

  const userinfo = await res.json()
  return { user: userinfo }
}

module.exports = {
  getManagementApiToken,
  updateUser,
  sendVerificationEmail,
  deleteUser,
  getUser,
}
