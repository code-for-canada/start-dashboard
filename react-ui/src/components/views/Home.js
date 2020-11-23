import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'

import LoginButton from 'components/common/LoginButton'
import SignupButton from 'components/common/SignupButton'
import getRandomImage from 'utils/randomImage'

import blob1 from 'assets/images/blob1.svg'
import blob2 from 'assets/images/blob2.svg'

const useStyles = makeStyles(theme => ({
  contentArea: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  },
  backgroundImage: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%'
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
  const { loginWithRedirect } = useAuth0()
  const classes = useStyles()

  useEffect(() => {
    const getImage = async () => {
      const image = await getRandomImage()
      setImage(image)
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
      <Container>
        <Grid container>
          <Grid xs={10} sm={8} md={6} lg={5}>
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
    </div>
  )
}

export default Home
