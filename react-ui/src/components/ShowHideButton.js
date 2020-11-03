import React from 'react'
import IconButton from 'components/IconButton'
import PropTypes from 'prop-types'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

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
