import React, { useState, useEffect } from 'react'
import DefaultLayout from '../layouts/default-layout'
import {
  Grid,
  Container,
  TextField,
  Button
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useAuth0 } from '@auth0/auth0-react'
import { updateResource } from '../utils/ApiHelper'
import { Block, BlockTitle } from '../components/dashboard/Block'
import Loading from '../components/loading'

const StatusAlert = ({ show, message, severity }) => {
  if (!show) {
    return null
  }

  return (
    <Alert severity={severity} variant="filled" className="mb-2">
      <p className="mb-0">{message}</p>
    </Alert>
  )
}

const Account = () => {
  const { user, getAccessTokenSilently, logout } = useAuth0()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({})

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

    try {
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
      if (data.error) {
        console.log(data.error)
        throw(data.error)
      }

      setAlert({ message: 'Your account has been updated.', severity: 'success' })
      if (accountData.email !== user.email) {
        logout({ redirectTo: '/account-updated' })
      }
    } catch (err) {
      setAlert({ message: 'We were unable to update your account. Please try again or contact us.', severity: 'warning' })
    }
  }

  if (!user.email_verified) {
    return(
      <DefaultLayout>
        <Container maxWidth="md" style={{marginTop: '40px', marginBottom: '40px'}}>
          <StatusAlert show={true} message={'You must verify your email before you can access this page.'} severity={'warning'} />
        </Container>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <Container style={{marginTop: '40px', marginBottom: '40px'}}>
        <Grid container justify="center">
          <Grid item md={6}>
            <StatusAlert show={Boolean(alert.message)} message={alert.message} severity={alert.severity} />
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item md={6}>
            <Block style={{ position: 'relative' }}>
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
                    helperText="If you change your email, you must verify the new email address before you can access your dashboard again."
                    required
                  />

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Save</Button>
              </form>
              {loading &&
                <div className="loading-backdrop">
                  <Loading />
                </div>
              }
            </Block>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}


export default Account
