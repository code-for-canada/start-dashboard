import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useAuth0 } from '@auth0/auth0-react'

import LoginButton from '../components/login-button'
import SignupButton from '../components/signup-button'
import getRandomImage from '../utils/randomImage'

import blob1 from '../assets/images/blob1.svg'
import blob2 from '../assets/images/blob2.svg'

const Home = () => {
  const [image, setImage] = useState()
  const { loginWithRedirect } = useAuth0()
  useEffect(() => {
    const getImage = async () => {
      const image = await getRandomImage()
      setImage(image)
    }
    if (!image) {
      getImage()
    }
  }, [image])

  const styles = {
    contentArea: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    backgroundImage: {
      backgroundImage: `url(${image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
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
    }
  }

  return (
    <div
      className="bg-img h-100 w-100"
      style={styles.backgroundImage}
      data-aos="fade-in">
      <Container className="flex-grow-1">
        <div
          className="content-area col-8 col-md-6 pt-5"
          style={styles.contentArea}>
          <div className="background" style={styles.contentBackground}>
            <img
              src={blob1}
              alt=""
              className="rotateme"
              style={{ position: 'absolute', opacity: '0.9' }}
            />
            <img
              src={blob2}
              alt=""
              className="rotateme-reverse"
              style={{ opacity: '0.9' }}
            />
          </div>
          <div className="content p-5" style={styles.content}>
            <h1 className="mb-5">StART Digital</h1>
            <LoginButton handleLogin={loginWithRedirect} />
            <SignupButton handleLogin={loginWithRedirect} />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Home
