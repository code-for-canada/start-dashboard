import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}))

const AccountUpdated = () => {
  const classes = useStyles()
  return (
    <DefaultLayout>
      <Container className={classes.container}>
        <Grid container justify="center">
          <Grid item md={6}>
            <Alert severity="success" variant="filled">
              <p>
                Your account has been updated. Please log in again to continue.
              </p>
            </Alert>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}

export default AccountUpdated
