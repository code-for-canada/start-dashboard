import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { Alert } from '@material-ui/lab'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import NavBar from 'components/common/NavBar'
import Footer from 'components/common/Footer'
import Loading from 'components/common/Loading'
import VerifyEmail from 'components/views/VerifyEmail'

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.background.default,
    flex: '1 1 auto',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
}))

const DashboardLayout = ({ children }) => {
  const { user, isLoading, logout } = useAuth0()
  const classes = useStyles()

  if (isLoading) {
    return <Loading />
  }

  if (user && !user.email_verified) {
    logout({ returnTo: `${window.location.origin}/verify-email` })
  }

  return (
    <div id="app" className={classes.app}>
      <NavBar />
      <main className={classes.main}>
        <Container maxWidth="lg">{children}</Container>
      </main>
      <Footer />
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node
}

export default DashboardLayout
