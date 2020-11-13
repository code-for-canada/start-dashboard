import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

const StatusAlert = ({ show = false, message = '', severity = 'success' }) => {
  if (!show) {
    return null
  }

  return (
    <Alert severity={severity} variant="filled" className="mb-2">
      <p className="mb-0">{message}</p>
    </Alert>
  )
}

StatusAlert.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string
}

export default StatusAlert
