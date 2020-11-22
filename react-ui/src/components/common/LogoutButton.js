import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const LogoutButton = props => {
  const { handleLogout } = props
  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="primary"
      className="btn-margin">
      Log Out
    </Button>
  )
}

LogoutButton.propTypes = {
  handleLogout: PropTypes.func
}

export default LogoutButton
