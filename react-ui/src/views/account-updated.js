import React from 'react'
import DefaultLayout from '../layouts/default-layout'
import {
  Grid,
  Container,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const AccountUpdated = () => {
  return (
    <DefaultLayout>
      <Container style={{marginTop: '40px', marginBottom: '40px'}}>
        <Grid container justify="center">
          <Grid item md={6}>
            <Alert
              severity="success"
              variant="filled"
              className="mb-2"
            >
              <p className="mb-0">Your account has been updated. Please log in again to continue.</p>
            </Alert>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}


export default AccountUpdated
