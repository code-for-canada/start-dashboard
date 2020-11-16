import React from 'react'
import PropTypes from 'prop-types'
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

LogoutButton.propTypes = {
  handleLogout: PropTypes.func
}

export default LogoutButton
