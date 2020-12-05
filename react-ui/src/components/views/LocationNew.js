import React from 'react'
import { Container, Grid } from '@material-ui/core'

import DefaultLayout from 'components/layouts/DefaultLayout'
import LocationForm from 'components/forms/LocationForm'
import useRoles from 'customHooks/useRoles'
import Unauthorized from 'components/views/Unauthorized'
import { useAuth0 } from '@auth0/auth0-react'
import { createResource } from 'utils/apiHelper'

const LocationNew = () => {
  const { isLoadingRoles, isStaff } = useRoles()
  const { getAccessTokenSilently } = useAuth0()

  const handleSubmit = async locationData => {
    const token = await getAccessTokenSilently({
      audience: 'https://dashboard.streetartoronto.ca/'
    })

    const opts = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(locationData)
    }

    const data = await createResource({ resource: 'location', opts })

    return data
  }

  if (!isLoadingRoles && !isStaff) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <LocationForm onSubmit={handleSubmit} handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}

export default LocationNew
