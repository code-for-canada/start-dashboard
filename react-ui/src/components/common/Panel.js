import React from 'react'
import PropTypes from 'prop-types'
import UnfoldLess from '@material-ui/icons/UnfoldLess'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import HelpIcon from '@material-ui/icons/HelpOutline'
import {
  Grid,
  IconButton,
  Hidden,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
  MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.25rem',
    marginBottom: 0,
    marginRight: theme.spacing(1)
  },
  flex: {
    display: 'flex',
    alignItems: 'baseline'
  },
  rotate: {
    transform: 'rotate(90deg)'
  },
  panel: {
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s ease'
  },
  body: props => ({
    transition: 'all 0.3s ease',
    width: '100%',
    height: props.isVisible ? 'auto' : '0',
    overflow: props.isVisible ? 'initial' : 'hidden'
  }),
  menuItem: {
    whiteSpace: 'pre-wrap'
  }
}))

const Panel = ({
  isVisible = true,
  isSmall = false,
  title,
  index,
  children,
  toggleVisibility,
  toggleSize,
  guides,
  id
}) => {
  const classes = useStyles({ isVisible })
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = event => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  return (
    <Grid item xs={12} md={isSmall ? 6 : 12} className={classes.panel}>
      <Accordion
        expanded={isVisible}
        onChange={() => toggleVisibility(id)}
        TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary classes={{ content: classes.header }}>
          <h2 className={classes.title}>{title}</h2>
          <div className={classes.flex}>
            {guides && (
              <>
                <IconButton
                  size="small"
                  aria-controls="docs-menu"
                  aria-haspopup="true"
                  title="User Guides"
                  aria-label="User Guides"
                  onClick={event => {
                    event.stopPropagation()
                    handleMenuClick(event)
                  }}
                  onFocus={event => event.stopPropagation()}>
                  <HelpIcon />
                </IconButton>
                <Menu
                  id="docs-menu"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}>
                  {guides.map(guide => (
                    <MenuItem
                      key={guide.link}
                      component="a"
                      target="_blank"
                      dense={true}
                      rel="noopener noreferrer"
                      href={guide.link}
                      onClick={handleMenuClose}
                      classes={{ root: classes.menuItem }}>
                      {guide.title}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}

            <Hidden smDown>
              <IconButton
                size="small"
                onClick={event => {
                  event.stopPropagation()
                  toggleSize(id)
                }}
                onFocus={event => event.stopPropagation()}>
                {isSmall ? (
                  <UnfoldMore className={classes.rotate} />
                ) : (
                  <UnfoldLess className={classes.rotate} />
                )}
              </IconButton>
            </Hidden>
            <IconButton size="small">
              {isVisible ? <UnfoldLess /> : <UnfoldMore />}
            </IconButton>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <div className={classes.body}>{children}</div>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}

Panel.propTypes = {
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  isSmall: PropTypes.bool,
  index: PropTypes.number,
  children: PropTypes.node,
  toggleVisibility: PropTypes.func,
  toggleSize: PropTypes.func,
  guides: PropTypes.array,
  id: PropTypes.string
}

export default Panel
