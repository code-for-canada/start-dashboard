import React, { useState, useEffect } from 'react'
import { Grid, Container } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'

import DefaultLayout from 'components/layouts/DefaultLayout'
import { updateResource, deleteResource } from 'utils/apiHelper'
import { Block, BlockTitle } from 'components/common/Block'
import Loading from 'components/common/Loading'
import StatusAlert from 'components/common/StatusAlert'
import AccountUpdateForm from 'components/forms/AccountUpdateForm'
import AccountDeleteForm from 'components/forms/AccountDeleteForm'
import useUtilityClasses from 'customHooks/useUtilityClasses'
import useRoles from 'customHooks/useRoles'

const Account = () => {
  const { user, getAccessTokenSilently, logout } = useAuth0()
  const { isArtist } = useRoles()
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({})
  const utilClasses = useUtilityClasses()

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
        const returnTo = `${window.location.origin}/account/success`
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

      const returnTo = `${window.location.origin}/account/deleted`
      logout({ returnTo })
    } catch (err) {
      console.log({ err })
      setAlert({
        message:
          'We were unable to delete your account. Please try again or contact us.',
        severity: 'warning'
      })
    }
  }

  return (
    <DefaultLayout>
      {loading && <Loading />}
      <Container className={utilClasses.container}>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <StatusAlert
              show={Boolean(alert.message)}
              message={alert.message}
              severity={alert.severity}
            />
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Block>
              <BlockTitle title="My account" />
              <AccountUpdateForm
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
              />
            </Block>
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Block>
              <BlockTitle title="Delete my account" />
              <AccountDeleteForm
                onSubmit={handleDelete}
                email={user.email}
                setAlert={setAlert}
                isArtist={isArtist}
              />
            </Block>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}

export default Account
