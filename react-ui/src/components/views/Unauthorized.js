import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2)
  }
}))

const Unauthorized = () => {
  const classes = useStyles()

  return (
    <DefaultLayout>
      <Container maxWidth="xl">
        <p className={classes.container}>
          You are not authorized to see this page.
        </p>
      </Container>
    </DefaultLayout>
  )
}

export default Unauthorized
