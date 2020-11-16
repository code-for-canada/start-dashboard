import React, { useState, useEffect } from 'react'
import DefaultLayout from '../layouts/default-layout'
import { Grid, Container } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'
import { updateResource, deleteResource } from '../utils/ApiHelper'
import { Block, BlockTitle } from '../components/dashboard/Block'
import Loading from '../components/loading'
import StatusAlert from '../components/StatusAlert'
import AccountUpdateForm from '../components/forms/AccountUpdateForm'
import AccountDeleteForm from '../components/forms/AccountDeleteForm'


const Account = () => {
  const { user, getAccessTokenSilently, logout } = useAuth0()
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({})

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        firstName: user['https://streetartoronto.ca/first_name'],
        lastName: user['https://streetartoronto.ca/last_name']
      })
    }
  }, [user])

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()

    try {
      const token = await getAccessTokenSilently({
        audience: 'https://dashboard.streetartoronto.ca/'
      })
      const opts = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      }
      const data = await updateResource({ resource: 'account', opts })
      setLoading(false)

      if (data.error) {
        console.log(data.error)
        throw new Error(data.error)
      }

      setAlert({
        message: 'Your account has been updated.',
        severity: 'success'
      })

      if (formData.email !== user.email) {
        const returnTo = `${window.location.origin}/account-updated`
        logout({ returnTo })
      }
    } catch (err) {
      setLoading(false)
      setAlert({
        message:
          'We were unable to update your account. Please try again or contact us.',
        severity: 'warning'
      })
    }
  }

  const handleDelete = async () => {
    setLoading(true)

    try {
      const token = await getAccessTokenSilently({
        audience: 'https://dashboard.streetartoronto.ca/'
      })
      const opts = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const data = await deleteResource({ resource: 'account', opts })
      setLoading(false)

      if (data.error) {
        console.log(data.error)
        throw new Error(data.error)
      }

      setAlert({
        message: 'Your account has been deleted.',
        severity: 'success'
      })

      const returnTo = `${window.location.origin}`
      logout({ returnTo })
    } catch (err) {
      console.log({err})
      setAlert({
        message:
          'We were unable to delete your account. Please try again or contact us.',
        severity: 'warning'
      })
    }
  }

  return (
    <DefaultLayout>
      <Container style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Grid container justify="center">
          <Grid item md={6}>
            <StatusAlert
              show={Boolean(alert.message)}
              message={alert.message}
              severity={alert.severity}
            />
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item md={6}>
            <Block style={{ position: 'relative', marginBottom: '20px' }}>
              <BlockTitle title="My Account" />
              <AccountUpdateForm
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
              />
              {loading && (
                <div className="loading-backdrop">
                  <Loading />
                </div>
              )}
            </Block>
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item md={6}>
            <Block style={{ position: 'relative' }}>
              <BlockTitle title="Danger Zone" />
              <AccountDeleteForm onSubmit={handleDelete} email={user.email} setAlert={setAlert} />
              {loading && (
                <div className="loading-backdrop">
                  <Loading />
                </div>
              )}
            </Block>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}

export default Account
