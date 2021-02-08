import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation } from 'react-router-dom'

import LoginButton from 'components/common/LoginButton'
import SignupButton from 'components/common/SignupButton'
import StatusAlert from 'components/common/StatusAlert'
import getRandomImage from 'utils/randomImage'

import blob1 from 'assets/images/blob1.svg'
import blob2 from 'assets/images/blob2.svg'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2)
  },
  contentArea: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  backgroundImage: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%'
  },
  imageCredit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    background: '#343a40',
    color: theme.palette.background.paper
  },
  content: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  contentBackground: {
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  blob: {
    opacity: '0.9'
  }
}))

const Home = () => {
  const [image, setImage] = useState()
  const [message, setMessage] = useState()
  const [artist, setArtist] = useState('Unknown')
  const { loginWithRedirect } = useAuth0()
  const classes = useStyles()
  const location = useLocation()

  useEffect(() => {
    console.log(location)
    if (location.search) {
      const params = new URLSearchParams(location.search);
      console.log({params})
      const message = params.get('message')
      if (message) {
        setMessage(message)
      }
    }
  }, [location])

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
    <div
      className={classes.backgroundImage}
      style={{ backgroundImage: `url(${image})` }}
      data-aos="fade-in">
      <Container className={classes.container}>
        <StatusAlert show={Boolean(message)} message={message} severity="info" />
        <Grid container>
          <Grid item xs={10} sm={8} md={6} lg={5}>
            <div className={classes.contentArea}>
              <div className={classes.contentBackground}>
                <img
                  src={blob1}
                  alt=""
                  className={`${classes.blob} rotateme`}
                  style={{ position: 'absolute' }}
                />
                <img
                  src={blob2}
                  alt=""
                  className={`${classes.blob} rotateme-reverse`}
                />
              </div>
              <div className={classes.content}>
                <h1>StART Digital</h1>
                <LoginButton handleLogin={loginWithRedirect} />
                <SignupButton handleLogin={loginWithRedirect} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.imageCredit}>{`Art by: ${artist}`}</div>
    </div>
  )
}

export default Home
