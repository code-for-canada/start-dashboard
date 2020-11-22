import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const LoginButton = props => {
  const { handleLogin } = props
  return (
    <Button
      onClick={handleLogin}
      variant="contained"
      color="primary"
      className="btn-margin">
      Log In
    </Button>
  )
}

LoginButton.propTypes = {
  handleLogin: PropTypes.func
}

export default LoginButton
