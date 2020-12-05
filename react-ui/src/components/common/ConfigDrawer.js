import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/Close'
import { Drawer, IconButton, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  drawer: {
    padding: '1rem'
  }
})

const ConfigDrawer = props => {
  const [open, setOpen] = useState(false)
  const { children } = props

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpen(open)
  }

  const classes = useStyles()

  return (
    <Grid container justify="flex-end">
      <Grid item>
        <IconButton
          size="small"
          onClick={toggleDrawer(true)}
          aria-label="Settings"
          title="Settings">
          <SettingsIcon />
        </IconButton>
        <Drawer anchor="right" open={open}>
          <div className={classes.drawer}>
            <Grid container justify="flex-end">
              <Grid item>
                <IconButton size="small" onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            {children}
          </div>
        </Drawer>
      </Grid>
    </Grid>
  )
}
ConfigDrawer.propTypes = {
  children: PropTypes.node
}

export default ConfigDrawer
