import React from 'react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import IconButton from 'components/common/IconButton'

const MoveDownButton = props => (
  <IconButton {...props}>
    <KeyboardArrowDownIcon />
  </IconButton>
)

export default MoveDownButton
