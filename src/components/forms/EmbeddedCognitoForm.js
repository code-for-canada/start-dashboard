import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const EmbeddedCognitoForm = ({ formId, showForm, opts }) => {
  const [cognitoLoaded, setCognitoLoaded] = useState(false)
  const [error, setError] = useState(null)
  const location = useLocation()

  // load the embedded CognitoForm
  useEffect(() => {
    if (!cognitoLoaded && showForm) {
      try {
        window.Cognito.load('forms', {
          id: formId,
          ...opts
        })
        setCognitoLoaded(true)
      } catch (err) {
        console.log(err)
        setError('This form is not available.')
      }
    }
  }, [showForm, cognitoLoaded, location, formId, opts])

  if (error || !showForm) {
    const errorMessage = error || 'This form is not available'
    return <p>{errorMessage}</p>
  }

  return <div className="cognito mt-4 mb-1" />
}

EmbeddedCognitoForm.propTypes = {
  formId: PropTypes.string.isRequired,
  showForm: PropTypes.bool,
  opts: PropTypes.object
}

EmbeddedCognitoForm.defaultProps = {
  showForm: true,
  opts: {}
}

export default EmbeddedCognitoForm
