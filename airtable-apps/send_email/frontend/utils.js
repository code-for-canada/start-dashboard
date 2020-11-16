import { useState, useEffect } from 'react'
import { useGlobalConfig } from '@airtable/blocks/ui'

const useAuth0Token = () => {
  const [token, setToken] = useState(null)
  const globalConfig = useGlobalConfig()

  useEffect(() => {
    const getToken = async () => {
      const authParams = {
        "audience": globalConfig.get('auth0ApiIdentifier'),
        "grant_type": "client_credentials",
        "client_id": globalConfig.get('auth0ClientId'),
        "client_secret": globalConfig.get('auth0ClientSecret')
      }

      const tokenResult = await fetch(globalConfig.get('auth0TokenEndpoint'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authParams)
      })

      const data = await tokenResult.json()

      setToken(data.access_token)
    }

    if (!token) {
      getToken()
    }
  }, [token, globalConfig])

  return token
}

const isTableEmailable = table => {
  const fieldNames = table.fields.map(f => f.name)
  return fieldNames.includes('email')
}

const sendEmail = async (endpoint, token, payload) => {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  const data = await res.json()

  return { res, data }
}

export { useAuth0Token, isTableEmailable, sendEmail }
