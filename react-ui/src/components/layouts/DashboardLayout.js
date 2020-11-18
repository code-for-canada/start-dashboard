import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { Alert } from '@material-ui/lab'
import { Container, Grid } from '@material-ui/core'

import NavBar from 'components/common/NavBar'
import Footer from 'components/common/Footer'
import getRandomImage from 'utils/randomImage'

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

const imageStyle = {
  width: '100%',
  height: 'auto',
  maxHeight: '500px',
  objectFit: 'cover'
}

const DashboardLayout = ({ children }) => {
  const { user } = useAuth0()
  const [image, setImage] = useState()
  useEffect(() => {
    const getImage = async () => {
      const image = await getRandomImage()
      setImage(image)
    }
    if (!user.email_verified && !image) {
      getImage()
    }
  }, [image, user])

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <main className="py-4 bg-light">
        {user && !user.email_verified ? (
          <Container maxWidth="md">
            <EmailVerificationAlert show={user && !user.email_verified} />
            <Grid container justify="center">
              <Grid item xs={12}>
                <img src={image} alt="" style={imageStyle} />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Container maxWidth="xl">{children}</Container>
        )}
      </main>
      <Footer />
    </div>
  )
}
DashboardLayout.propTypes = {
  children: PropTypes.node
}

export default DashboardLayout
