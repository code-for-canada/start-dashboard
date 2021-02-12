import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  block: {
    marginBottom: theme.spacing(2)
  }
}))

const Block = ({ children, style }) => {
  const classes = useStyles()
  return (
    <Card style={style} className={classes.block}>
      <CardContent>{children}</CardContent>
    </Card>
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
