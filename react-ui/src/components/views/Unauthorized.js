import React from 'react'
import { Container } from '@material-ui/core'

import DefaultLayout from 'components/layouts/DefaultLayout'

const Unauthorized = () => (
  <DefaultLayout>
    <Container maxWidth="xl">
      <p className="mt-4 mb-1">You are not authorized to see this page.</p>
    </Container>
  </DefaultLayout>
)

export default Unauthorized
