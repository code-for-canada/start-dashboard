import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const LoginButton = ({ handleLogin, ...rest }) => {
  return (
    <Button
      onClick={handleLogin}
      variant="contained"
      color="primary"
      disableElevation
      {...rest}>
      Log In
    </Button>
  )
}

LoginButton.propTypes = {
  handleLogin: PropTypes.func
}

export default LoginButton
