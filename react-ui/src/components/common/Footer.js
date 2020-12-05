import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useUtilityClasses from 'customHooks/useUtilityClasses'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: 'center'
  }
}))

const Footer = () => {
  const classes = useStyles()
  const utilClasses = useUtilityClasses()
  return (
    <footer className={`${classes.footer} ${utilClasses.shadow}`}>
      <p className="m-0">© Street Art Toronto 2020</p>
    </footer>
  )
}

export default Footer
