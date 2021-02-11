import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2)
  }
}))

const PrivacyPolicy = () => {
  const classes = useStyles()

  return (
    <DefaultLayout>
      <Container maxWidth="xl" className={classes.container}>
        <h1>Privacy Policy</h1>
        <p>
          Coming soon.
        </p>
      </Container>
    </DefaultLayout>
  )
}

export default PrivacyPolicy
