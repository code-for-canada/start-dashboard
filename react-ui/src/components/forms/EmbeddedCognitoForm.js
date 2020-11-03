import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const EmbeddedCognitoForm = ({ formId, showForm, opts, afterSubmit }) => {
  const [cognitoLoaded, setCognitoLoaded] = useState(false)
  const [error, setError] = useState(null)

  // load the embedded CognitoForm
  useEffect(() => {
    if (!cognitoLoaded && showForm) {
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
                window
                  .ExoJQuery(document)
                  .on('afterSubmit.cognito', afterSubmit)
              })
            }
          }
        )
        setCognitoLoaded(true)
      } catch (err) {
        console.log(err)
        setError('This form is not available.')
      }
    }
  }, [showForm, cognitoLoaded, formId, opts, afterSubmit])

  if (error || !showForm) {
    const errorMessage = error || 'This form is not available'
    return <p>{errorMessage}</p>
  }

  return <div className="cognito mt-4 mb-1" />
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
