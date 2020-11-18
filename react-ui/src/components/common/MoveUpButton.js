import React from 'react'
import PropTypes from 'prop-types'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import IconButton from 'components/common/IconButton'

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
