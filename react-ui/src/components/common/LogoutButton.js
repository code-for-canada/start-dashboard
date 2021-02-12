import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const LogoutButton = ({ handleLogout, ...rest }) => {
  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="primary"
      disableElevation
      {...rest}>
      Log Out
    </Button>
  )
}

LogoutButton.propTypes = {
  handleLogout: PropTypes.func
}

export default LogoutButton
