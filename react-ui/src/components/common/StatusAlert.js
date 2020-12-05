import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

const StatusAlert = ({
  show = false,
  severity = 'success',
  message,
  onClose,
  children,
  classes
}) => {
  if (!show) {
    return null
  }

  return (
    <Alert
      classes={classes}
      severity={severity}
      variant="filled"
      onClose={onClose}>
      {message ? <p className="mb-0">{message}</p> : children}
    </Alert>
  )
}

StatusAlert.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  classes: PropTypes.object
}

export default StatusAlert
