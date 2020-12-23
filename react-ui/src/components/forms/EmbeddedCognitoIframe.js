import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const EmbeddedCognitoIframe = ({ src, title }) => {
  // load the embed script
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://www.cognitoforms.com/scripts/embed.js'

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <iframe
      src={src}
      title={title}
      style={{
        position: 'relative',
        minWidth: '100%'
      }}
      frameBorder="0"
      scrolling="yes"
      seamless="seamless"
      height="885"
      width="100%"
    />
  )
}

EmbeddedCognitoIframe.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default EmbeddedCognitoIframe
