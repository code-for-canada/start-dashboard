import React from 'react'
import PropTypes from 'prop-types'
import UnfoldLess from '@material-ui/icons/UnfoldLess'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import Edit from '@material-ui/icons/Edit'
import { Grid, IconButton, Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    backgroundColor: 'white',
    border: '1px solid #cccccc',
    marginBottom: '5px'
  },
  title: {
    fontSize: '1.25rem',
    marginBottom: 0,
    marginRight: '1rem',
    marginLeft: '1rem'
  },
  flex: {
    display: 'flex',
    alignItems: 'baseline'
  },
  rotate: {
    transform: 'rotate(90deg)'
  },
  panel: {
    marginBottom: '1rem',
    padding: '0.5rem'
  }
})

const Panel = ({
  editLink = 'https://airtable.com/tbl5ApSEOzPpe4fwp/viw2swQLeJ9xwU82F?blocks=hide',
  editText = 'Edit in Airtable',
  isVisible = true,
  isSmall = false,
  title,
  index,
  children,
  toggleVisibility,
  toggleSize
}) => {
  const classes = useStyles()

  return (
    <Grid xs={12} lg={isSmall ? 6 : 12} className={classes.panel}>
      <div className={classes.header}>
        <div className={classes.flex}>
          <h2 className={classes.title}>{title}</h2>
          <Hidden smDown>
            <a
              className="d-none d-md-block"
              href={editLink}
              target="_blank"
              rel="noopener noreferrer">
              {editText}
            </a>
          </Hidden>
        </div>
        <div className={classes.flex}>
          <Hidden smDown>
            <IconButton
              component={'a'}
              size="small"
              href={editLink}
              target="_blank"
              rel="noopener noreferrer">
              <Edit />
            </IconButton>
          </Hidden>

          <Hidden smDown>
            <IconButton size="small" onClick={() => toggleSize(index)}>
              {isSmall ? (
                <UnfoldMore className={classes.rotate} />
              ) : (
                <UnfoldLess className={classes.rotate} />
              )}
            </IconButton>
          </Hidden>
          <IconButton size="small" onClick={() => toggleVisibility(index)}>
            {isVisible ? <UnfoldLess /> : <UnfoldMore />}
          </IconButton>
        </div>
      </div>
      <div className="body">{children}</div>
    </Grid>
  )
}

Panel.propTypes = {
  title: PropTypes.string,
  editLink: PropTypes.string,
  editText: PropTypes.string,
  isVisible: PropTypes.bool,
  isSmall: PropTypes.bool,
  index: PropTypes.number,
  children: PropTypes.node,
  toggleVisibility: PropTypes.func,
  toggleSize: PropTypes.func
}

export default Panel
