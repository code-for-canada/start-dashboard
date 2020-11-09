import React from 'react'
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

export default LoginButton
