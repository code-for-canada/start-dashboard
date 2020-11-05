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

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={props.onClick}>
        {props.media && <CardMedia className={classes.media} image={props.media} />}
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
            style={{
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
