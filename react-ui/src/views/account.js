import React, { useState, useEffect } from 'react'
import DefaultLayout from '../layouts/default-layout'
import { TextField } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'
import { updateResource } from '../utils/ApiHelper'


const Account = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [ email, setEmail ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  useEffect(() => {
    if (user) {
      console.log("user", user)
      setEmail(user.email)
      setFirstName(user.user_metadata?.first_name)
      setLastName(user.user_metadata?.last_name)
    }
  }, [user])


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({e})

    const accountData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    }

    console.log({accountData})

    const token = await getAccessTokenSilently({
      audience: 'https://dashboard.streetartoronto.ca/',
    });
    const opts = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(accountData)
    }
    const data = await updateResource({ resource: 'account', opts })
    console.log("data!!", data)
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First name"
          value={firstName || ''}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
        <TextField
          label="Last name"
          value={lastName || ''}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
        <TextField
          label="Email address"
          value={email || ''}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input type="submit" />
      </form>
    </DefaultLayout>
  )
}


export default Account
