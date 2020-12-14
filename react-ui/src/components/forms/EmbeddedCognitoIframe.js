import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const EmbeddedCognitoIframe = ({ src }) => {
  const [cognitoLoaded, setCognitoLoaded] = useState(false)
  const [error, setError] = useState(null)

  // load the embed script
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://www.cognitoforms.com/scripts/embed.js";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <iframe
      src={src}
      style={{
        position: 'relative',
        width: '1px ',
        minWidth: '100%',
        width: '100%'
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
  src: PropTypes.string.isRequired
}

export default EmbeddedCognitoIframe
