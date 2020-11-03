import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import LoginButton from '../components/login-button'

import blob1 from '../assets/images/blob1.svg'
import blob2 from '../assets/images/blob2.svg'

const defaultImg =
  'https://dl.airtable.com/.attachments/bf85b19d45989b61b38d0499a0c9ab3d/bcb3bc8b/UNADJUSTEDRAW_thumb_f416.jpg'

const Home = () => {
  const [image, setImage] = useState()
  useEffect(() => {
    if (!image) {
      fetch(
        'https://raw.githubusercontent.com/code-for-canada/start-map/master/public/geojson/ftrs.json'
      )
        .then(response => response.json())
        .then(data => {
          const feature =
            data.features[Math.floor(Math.random() * data.features.length)]
          console.log(feature)
          if (feature.properties.media && feature.properties.media.length > 0) {
            setImage(feature.properties.media[0].url)
          } else setImage(defaultImg)
        })
    }
  })

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
            <LoginButton />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Home
