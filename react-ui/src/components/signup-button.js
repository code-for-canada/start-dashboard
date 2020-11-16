import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const SignupButton = ({ handleLogin }) => {
  return (
    <Button
      onClick={() => handleLogin({ screen_hint: 'signUp' })}
      variant="link"
      className="btn-margin mt-2">
      Sign Up
    </Button>
  )
}

SignupButton.propTypes = {
  handleLogin: PropTypes.func
}

export default SignupButton
