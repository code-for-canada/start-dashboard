import React from 'react'
import PropTypes from 'prop-types'
import Bookmarks from '@material-ui/icons/Bookmarks'

import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  menuItem: {
    whiteSpace: 'pre-wrap'
  }
}))

const ShortcutMenu = ({ links = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = event => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        size="small"
        aria-controls="shortcuts-menu"
        aria-haspopup="true"
        title="Shortcuts"
        aria-label="Shortcuts"
        onClick={event => {
          handleMenuClick(event)
        }}>
        <Bookmarks />
      </IconButton>
      <Menu
        id="shortcuts-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>
        {links.map(shortcut => (
          <MenuItem
            key={shortcut.link}
            component="a"
            target="_blank"
            dense={true}
            rel="noopener noreferrer"
            href={shortcut.link}
            onClick={handleMenuClose}
            classes={{ root: classes.menuItem }}>
            {shortcut.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

ShortcutMenu.propTypes = {
  links: PropTypes.array
}

export default ShortcutMenu
