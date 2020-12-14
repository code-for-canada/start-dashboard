import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  iframeContainer: {
    height: '100%',
    marginBottom: theme.spacing(2),
  },
  iframe: props => ({
    backgroundColor: theme.palette.background.default,
    ...props.style
  })
}))

const EmbeddedIframe = ({
  title,
  src,
  alwaysEnableScroll,
  width = '100%',
  height = '500',
  style = {}
}) => {
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const classes = useStyles({ style })
  const enableScroll = () => {
    setScrollEnabled(true)
  }
  const disableScroll = () => {
    setScrollEnabled(false)
  }

  const iframeStyle = {
    pointerEvents: alwaysEnableScroll ? 'auto' : scrollEnabled ? 'auto' : 'none'
  }

  return (
    <div
      onClick={enableScroll}
      onMouseLeave={disableScroll}
      className={classes.iframeContainer}>
      <iframe
        title={title}
        className={`${classes.iframe} airtable-embed`}
        src={src}
        frameBorder="0"
        width={width}
        height={height}
        style={iframeStyle}
      />
    </div>
  )
}

EmbeddedIframe.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string
}

export default EmbeddedIframe
