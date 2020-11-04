import React from 'react'
import PropTypes from 'prop-types'

const IconButton = props => {
  const { onClick, disabled = false, children } = props

  return (
    <>
      <style type="text/css">
        {`
        #panel-control-block svg {
          width: 0.8em;
        }
        `}
      </style>
      <button
        onClick={onClick}
        disabled={disabled}
        className="btn btn-secondary btn-light"
        type="button">
        {children}
      </button>
    </>
  )
}
IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default IconButton
