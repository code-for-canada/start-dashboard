import React from 'react'
import { Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  }
}))

const PageMissing = () => {
  const classes = useStyles()
  return (
    <DefaultLayout>
      <Container maxWidth="xl">
        <p className={classes.container}>Oops! There&apos;s nothing here.</p>
        <Link to="/">Back to the Dashboard</Link>
      </Container>
    </DefaultLayout>
  )
}

export default PageMissing
