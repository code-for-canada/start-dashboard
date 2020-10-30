import React from 'react'
import IconButton from 'components/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import PropTypes from 'prop-types'

const MoveUpButton = ({ onClick, disabled = false }) => (
  <IconButton {...{ onClick, disabled }}>
    <KeyboardArrowUpIcon />
  </IconButton>
)
MoveUpButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default MoveUpButton
