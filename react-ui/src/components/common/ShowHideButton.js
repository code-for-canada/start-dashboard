import React from 'react'
import PropTypes from 'prop-types'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import IconButton from 'components/common/IconButton'

const ShowHideButton = props => {
  const { isVisible } = props

  return (
    <IconButton {...props}>
      {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  )
}
ShowHideButton.propTypes = {
  isVisible: PropTypes.bool.isRequired
}

export default ShowHideButton
