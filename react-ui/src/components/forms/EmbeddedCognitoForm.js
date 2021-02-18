import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const EmbeddedCognitoForm = ({ formId, showForm, opts, afterSubmit }) => {
  const [cognitoLoaded, setCognitoLoaded] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://www.cognitoforms.com/s/vQtvojkwk0qKXX6uRXdPYA'
    script.async = true
    script.onload = () => setScriptLoaded(true)

    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const loadCognitoForm = () => {
    try {
      window.Cognito.load(
        'forms',
        {
          id: formId,
          ...opts
        },
        {
          success: () => {
            window.ExoJQuery(() => {
              window.ExoJQuery(document).on('afterSubmit.cognito', afterSubmit)
            })
          }
        }
      )
      setCognitoLoaded(true)
    } catch (err) {
      console.log(err)
      setError('There was an error loading the form. Please try again.')
    }
  }

  // load the embedded CognitoForm
  useEffect(() => {
    if (scriptLoaded && !cognitoLoaded && showForm) {
      loadCognitoForm()
    }
  }, [showForm, cognitoLoaded, formId, opts, afterSubmit, scriptLoaded])

  if (error || !showForm) {
    const errorMessage = error || 'This form is not available'
    return <p>{errorMessage}</p>
  }

  return <div className="cognito" />
}

EmbeddedCognitoForm.propTypes = {
  formId: PropTypes.string.isRequired,
  showForm: PropTypes.bool,
  opts: PropTypes.object,
  afterSubmit: PropTypes.func
}

EmbeddedCognitoForm.defaultProps = {
  showForm: true,
  opts: {}
}

export default EmbeddedCognitoForm
