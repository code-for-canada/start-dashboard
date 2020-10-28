import React from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { NavBar, Footer } from '../components'
import { Alert } from '@material-ui/lab'
import { Container } from '@material-ui/core'

const EmailVerificationAlert = ({ show }) => {
  if (!show) {
    return null
  }

  return (
    <Alert severity="warning" variant="filled" className="mb-2">
      <p className="mb-0">
        Your email address is not verified yet. Please check your inbox for the
        verification email!
      </p>
    </Alert>
  )
}

EmailVerificationAlert.propTypes = {
  show: PropTypes.bool
}

const DashboardLayout = ({ children }) => {
  const { user } = useAuth0()
  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <main className="p-4 bg-light">
        <Container maxWidth="xl">
          <EmailVerificationAlert show={user && !user.email_verified} />
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  )
}
DashboardLayout.propTypes = {
  children: PropTypes.node
}

export default DashboardLayout
