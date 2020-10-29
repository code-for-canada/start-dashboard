import React from 'react'
import DefaultLayout from '../layouts/default-layout'
import { Link } from 'react-router-dom'
import { Container, Grid } from '@material-ui/core'

const ProfileCreated = () => (
  <DefaultLayout>
    <Container maxWidth="xl">
      <Grid container justify="center">
        <Grid item md={6}>
          <div className="mt-10">
            <h2 className="mb-4">Your profile has been created!</h2>
            <p className="mb-4">
              Please make sure to keep your profile up to date. This is how we
              contact you about your current projects, ongoing applications, or
              future opportunities we think you would be interested in.
            </p>
            <Link to="/dashboard" className="btn btn-primary">
              Back to my dashboard
            </Link>
          </div>
        </Grid>
      </Grid>
    </Container>
  </DefaultLayout>
)

export default ProfileCreated
