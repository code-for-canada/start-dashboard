import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const SignupButton = ({ handleLogin, ...rest }) => {
  return (
    <Button
      disableElevation
      variant="outlined"
      onClick={() => handleLogin({ screen_hint: 'signUp' })}
      {...rest}>
      Sign Up
    </Button>
  )
}

SignupButton.propTypes = {
  handleLogin: PropTypes.func
}

export default SignupButton
