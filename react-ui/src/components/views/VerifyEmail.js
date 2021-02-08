import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { Alert } from '@material-ui/lab'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'

import Loading from 'components/common/Loading'
import StatusAlert from 'components/common/StatusAlert'
import getRandomImage from 'utils/randomImage'
import DefaultLayout from 'components/layouts/DefaultLayout'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2)
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '500px',
    objectFit: 'cover'
  }
}))

const EmailVerificationAlert = () => {
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

const VerifyEmail = ({ children }) => {
  const { logout } = useAuth0()
  const [image, setImage] = useState()
  const [artist, setArtist] = useState('Unknown')
  const classes = useStyles()

  useEffect(() => {
    const getImage = async () => {
      const { url, artist } = await getRandomImage()
      setImage(url)
      if (artist) {
        setArtist(artist)
      }
    }
    if (!image) {
      getImage()
    }
  }, [image])


  return (
    <DefaultLayout>
      <Container maxWidth="md" className={classes.container}>
        <EmailVerificationAlert />
        <Grid container justify="center">
          <Grid item xs={12}>
            <img src={image} alt="" className={classes.image} />
          </Grid>
        </Grid>
        <div className={classes.imageCredit}>{`Art by: ${artist}`}</div>
      </Container>
    </DefaultLayout>
  )
}
VerifyEmail.propTypes = {
  children: PropTypes.node
}

export default VerifyEmail
