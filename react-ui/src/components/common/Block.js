import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(1)
  },
  block: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    border: '1px solid #000',
    borderColor: theme.palette.divider
  }
}))

const Block = ({ children, style }) => {
  const classes = useStyles()
  return (
    <div className={classes.block} style={style}>
      {children}
    </div>
  )
}

const BlockTitle = ({ title }) => {
  const classes = useStyles()
  return <h2 className={classes.title}>{title}</h2>
}

Block.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

BlockTitle.propTypes = {
  title: PropTypes.string
}

export { Block, BlockTitle }
