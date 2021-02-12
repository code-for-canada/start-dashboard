import React, { useEffect, useState } from 'react'
import { Grid, Button, Hidden, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation, Link } from 'react-router-dom'

import LoginButton from 'components/common/LoginButton'
import SignupButton from 'components/common/SignupButton'
import StatusAlert from 'components/common/StatusAlert'
import getRandomImage from 'utils/randomImage'

const PLACEHOLDER_IMG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const useStyles = makeStyles(theme => ({
  page: {
    height: '100%'
  },
  imageContainer: {
    height: '100%',
    overflow: 'hidden',
    background: theme.palette.action.hover
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    border: 'none',
    outline: 'none',
    content: ''
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  alert: {
    padding: theme.spacing(2)
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  para: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(6),
    fontSize: '1.5em'
  },
  title: {
    marginBottom: '2em',
    fontSize: '3.5em',
    color: theme.palette.primary.main
  },
  footer: {
    background: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    bottom: 0,
    width: '100%'
  },
  feedback: {
    color: 'white',
    borderColor: 'white',
    flexShrink: 0,
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
    if (location.search) {
      const params = new URLSearchParams(location.search)
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
    <Grid container alignItems="stretch" className={classes.page}>
      <Grid item xs={12} md={4}>
        <Paper elevation={4} className={classes.login} square>
          <div className={classes.alert}>
            <StatusAlert
              show={Boolean(message)}
              message={message}
              severity="info"
            />
          </div>
          <div className={classes.mainContent}>
            <h1 className={classes.title}>StART Digital</h1>
            <LoginButton handleLogin={loginWithRedirect} size="large" />
            <p className={classes.para}>Don&apos;t have an account?</p>
            <SignupButton handleLogin={loginWithRedirect} size="large" />
          </div>
          <div className={classes.footer}>
            <div>
              <Hidden smDown>{`Art by: ${artist}`}</Hidden>
            </div>
            <Button
              component={Link}
              to="/feedback"
              variant="outlined"
              className={classes.feedback}>
              Report a Bug{' '}
              <span role="img" aria-label="bug">
                🐛
              </span>
            </Button>
          </div>
        </Paper>
      </Grid>
      <Hidden smDown>
        <Grid item xs={12} md={8} className={classes.imageContainer}>
          <img
            src={image || PLACEHOLDER_IMG}
            className={classes.image}
            alt={`Street art by ${artist}`}
          />
        </Grid>
      </Hidden>
    </Grid>
  )
}

export default Home
