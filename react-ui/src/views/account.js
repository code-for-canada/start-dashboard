import React, { useState, useEffect } from 'react'
import DefaultLayout from '../layouts/default-layout'
import {
  Grid,
  Container,
  FormControl,
  TextField,
  Button
} from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'
import { updateResource } from '../utils/ApiHelper'
import { Block, BlockTitle } from '../components/dashboard/Block'


const Account = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setEmail(user.email)
      setFirstName(user['https://streetartoronto.ca/first_name'])
      setLastName(user['https://streetartoronto.ca/last_name'])
    }
  }, [user])


  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    const accountData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    }

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
    setLoading(false)
    console.log({data})
  }

  return (
    <DefaultLayout>
      <Container>
        <Grid container justify="center" style={{marginTop: '40px', marginBottom: '40px'}}>
          <Grid item md={6}>
            <Block>
              <BlockTitle title="My Account" />
              <form onSubmit={handleSubmit}>
                  <TextField
                    label="First name"
                    value={firstName || ''}
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                    fullWidth={true}
                    variant="outlined"
                    margin="dense"
                  />

                  <TextField
                    label="Last name"
                    value={lastName || ''}
                    onChange={(e) => setLastName(e.currentTarget.value)}
                    fullWidth={true}
                    variant="outlined"
                    margin="dense"
                  />

                  <TextField
                    label="Email address"
                    value={email || ''}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    fullWidth={true}
                    variant="outlined"
                    margin="dense"
                  />

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Save</Button>
              </form>
            </Block>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}


export default Account
