import React from 'react'
import { Container } from '@material-ui/core'

import DefaultLayout from 'components/layouts/DefaultLayout'
import LocationForm from 'components/forms/LocationForm'
import { DEFAULT_MAP_CENTER } from 'utils/constants'

const LocationNew = () => (
  <DefaultLayout>
    <Container>
      <div className="row mb-4">
        <div className="col-12 my-5">
          <LocationForm center={DEFAULT_MAP_CENTER} height="400px" zoom={14} />
        </div>
      </div>
    </Container>
  </DefaultLayout>
)

export default LocationNew
