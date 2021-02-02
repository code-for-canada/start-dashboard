import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { Alert } from '@material-ui/lab'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import NavBar from 'components/common/NavBar'
import Footer from 'components/common/Footer'
import Loading from 'components/common/Loading'
import getRandomImage from 'utils/randomImage'

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
  const { user, isLoading } = useAuth0()
  const [image, setImage] = useState()
  const [artist, setArtist] = useState('Unknown')

  useEffect(() => {
    const getImage = async () => {
      const { url, artist } = await getRandomImage()
      setImage(url)
      if (artist) {
        setArtist(artist)
      }
    }
    if (!isLoading && !user.email_verified && !image) {
      getImage()
    }
  }, [image, user, isLoading])

  const classes = useStyles()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div id="app" className={classes.app}>
      <NavBar />
      <main className={classes.main}>
        {user && !user.email_verified ? (
          <Container maxWidth="md">
            <EmailVerificationAlert show={user && !user.email_verified} />
            <Grid container justify="center">
              <Grid item xs={12}>
                <img src={image} alt="" style={imageStyle} />
              </Grid>
            </Grid>
            <div className={classes.imageCredit}>{`Art by: ${artist}`}</div>
          </Container>
        ) : (
          <Container maxWidth="lg">{children}</Container>
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
