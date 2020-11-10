
export const getAuth0Token = async (audience, clientId, clientSecret, tokenEndpoint) => {
  const authParams = {
    "audience": audience,
    "grant_type": "client_credentials",
    "client_id": clientId,
    "client_secret": clientSecret
  }

  const tokenResult = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authParams)
  })

  const data = await tokenResult.json()

  return data.access_token
}

export const isTableEmailable = table => {
  const fieldNames = table.fields.map(f => f.name)
  return fieldNames.includes('email')
}