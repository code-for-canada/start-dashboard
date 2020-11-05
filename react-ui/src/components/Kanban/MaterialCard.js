import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createMuiTheme,
  makeStyles,
  Typography
} from '@material-ui/core'
import ProgramChip from './ProgramChip'
import placeholder from 'assets/images/placeholder.png'

// const BASE_ID = 'tbl5ApSEOzPpe4fwp'
// const TABLE_ID = 'viw2swQLeJ9xwU82F'

const theme = createMuiTheme()
const useStyles = makeStyles({
  root: {
    minWidth: 230,
    maxWidth: 250,
    marginBottom: theme.spacing(1)
  },
  media: {
    height: 140
  }
})

const MaterialCard = props => {
  const classes = useStyles()

  const image = props.media ? props.media : placeholder

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={props.onClick}>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            style={{
              textOverflow: 'ellipsis',
              overflow: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {props.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
            style={{
              // Allow multiline
              whiteSpace: 'pre-wrap',
              // Max 3 line before ellipses
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {props.description}
          </Typography>
          <ProgramChip label={props.program} />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

MaterialCard.propTypes = {
  foo: PropTypes.string,
}

export default MaterialCard
