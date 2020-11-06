import React from 'react'
import { Button } from 'react-bootstrap'

const SignupButton = ({ handleLogin }) => {
  return (
    <Button
      onClick={() =>
        handleLogin({ screen_hint: 'signUp' })
      }
      variant="link"
      className="btn-margin mt-2">
      Sign Up
    </Button>
  )
}

export default SignupButton
