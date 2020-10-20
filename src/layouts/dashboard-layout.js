import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { NavBar, Footer } from '../components'
import { Alert, Container } from 'react-bootstrap'

const EmailVerificationAlert = ({ open }) => {
  return (
    <Container>
      <Alert show={open} variant="primary">
        <p className="mb-0">
          Your email address is not verified yet. We just sent you the
          verification email, please check your inbox!
        </p>
      </Alert>
    </Container>
  )
}

const DashboardLayout = ({ children }) => {
  const { user } = useAuth0()
  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <main className="p-4 bg-light">
        <EmailVerificationAlert open={user && !user.email_verified} />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DashboardLayout
