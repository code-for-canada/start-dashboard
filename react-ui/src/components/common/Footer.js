import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useCommonStyles from 'customHooks/useCommonStyles'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: 'center'
  }
}))

const Footer = () => {
  const classes = useStyles()
  const commonClasses = useCommonStyles()
  return (
    <footer className={`${classes.footer} ${commonClasses.shadow}`}>
      <p className="m-0">© Street Art Toronto 2020</p>
    </footer>
  )
}

export default Footer
