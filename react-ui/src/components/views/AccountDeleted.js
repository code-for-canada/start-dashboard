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

const AccountDeleted = () => {
  const classes = useStyles()
  return (
    <DefaultLayout>
      <Container className={classes.container}>
        <Grid container justify="center">
          <Grid item md={6}>
            <Alert severity="success" variant="filled">
              Your account has been deleted and you have been logged out.
            </Alert>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}

export default AccountDeleted
