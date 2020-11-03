import React from 'react'
import { Button } from 'react-bootstrap'

const LogoutButton = props => {
  const { handleLogout } = props
  return (
    <Button
      onClick={handleLogout}
      variant="danger"
      className="btn-margin">
      Log Out
    </Button>
  )
}

export default LogoutButton
