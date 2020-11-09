import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const LoginButton = props => {
  const { handleLogin } = props
  return (
    <Button
      onClick={handleLogin}
      variant="primary"
      className="btn-margin ml-md-2">
      Log In
    </Button>
  )
}

LoginButton.propTypes = {
  handleLogin: PropTypes.func
}

export default LoginButton
