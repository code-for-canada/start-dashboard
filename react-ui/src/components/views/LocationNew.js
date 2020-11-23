import React from 'react'
import { Container, Grid } from '@material-ui/core'

import DefaultLayout from 'components/layouts/DefaultLayout'
import LocationForm from 'components/forms/LocationForm'
import { DEFAULT_MAP_CENTER } from 'utils/constants'

const LocationNew = () => (
  <DefaultLayout>
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <LocationForm center={DEFAULT_MAP_CENTER} height="400px" zoom={14} />
        </Grid>
      </Grid>
    </Container>
  </DefaultLayout>
)

export default LocationNew
