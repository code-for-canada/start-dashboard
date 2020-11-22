import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

const StatusAlert = ({
  show = false,
  severity = 'success',
  message,
  onClose,
  children
}) => {
  if (!show) {
    return null
  }

  return (
    <Alert
      severity={severity}
      variant="filled"
      className="mb-2"
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
  onClose: PropTypes.func
}

export default StatusAlert
