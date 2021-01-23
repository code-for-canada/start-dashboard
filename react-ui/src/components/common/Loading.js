import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import loading from 'assets/images/loading.svg'

const useStyles = makeStyles({
  spinner: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
})

const Loading = () => {
  const classes = useStyles()
  return (
    <div className={classes.spinner}>
      <img src={loading} alt="Loading" />
    </div>
  )
}

export default Loading
