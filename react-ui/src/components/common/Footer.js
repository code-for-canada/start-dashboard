import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Hidden } from '@material-ui/core'
import useUtilityClasses from 'customHooks/useUtilityClasses'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  nav: {
    paddingRight: '0.5rem',
    paddingLeft: '0.5rem',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main
    },
    '&:focus': {
      color: theme.palette.primary.dark
    }
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    '& > a': {
      paddingLeft: '0',
      paddingBottom: '0.5rem'
    }
  }
}))

const Footer = () => {
  const classes = useStyles()
  const utilClasses = useUtilityClasses()

  return (
    <footer className={`${classes.footer} ${utilClasses.shadow}`}>
      <Hidden xsDown>
        <div>
          <a
            href="https://streetartoronto.ca"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.nav}>
            Street Art Toronto Map
          </a>
          <Link to="/privacy" className={classes.nav}>
            Privacy policy
          </Link>
          <Link to="/feedback" className={classes.nav}>
            Submit feedback
          </Link>
        </div>
        <div>
          <p className="m-0">© Street Art Toronto 2020</p>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className={classes.mobileMenu}>
          <a
            href="https://streetartoronto.ca"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.nav}>
            Street Art Toronto Map
          </a>
          <Link to="/privacy" className={classes.nav}>
            Privacy policy
          </Link>
          <Link to="/feedback" className={classes.nav}>
            Submit feedback
          </Link>
          <p className="m-0">© Street Art Toronto 2020</p>
        </div>
      </Hidden>
    </footer>
  )
}

export default Footer
