import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useAuth0 } from '@auth0/auth0-react'
import useCommonStyles from 'customHooks/useCommonStyles'
import LogoutButton from 'components/common/LogoutButton'
import LoginButton from 'components/common/LoginButton'

const useStyles = makeStyles(theme => ({
  menuSection: {
    display: 'flex',
    alignItems: 'center'
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
  }
}))

const AuthNav = ({
  isAuthenticated = true,
  handleLogin = () => {},
  handleLogout = () => {}
}) => {
  if (isAuthenticated) {
    return <LogoutButton handleLogout={handleLogout} />
  }

  return <LoginButton handleLogin={handleLogin} />
}

AuthNav.propTypes = {
  handleLogin: PropTypes.func,
  handleLogout: PropTypes.func,
  isAuthenticated: PropTypes.bool
}

const NavBar = ({ useAuthHook = useAuth0 }) => {
  const { isAuthenticated, user, logout, loginWithRedirect } = useAuthHook()
  const classes = useStyles()
  const commonClasses = useCommonStyles()
  const userName = user
    ? user['https://streetartoronto.ca/first_name'] || user.nickname
    : 'Guest'

  return (
    <AppBar
      position="static"
      className={`${commonClasses.shadow} ${commonClasses.bgWhite}`}>
      <Toolbar variant="dense">
        <Grid container justify="space-between">
          <Grid item className={classes.menuSection}>
            <NavLink to="/" className={classes.nav}>
              {userName ? `Hi, ${userName}! 👋` : 'StART Guest'}
            </NavLink>
          </Grid>

          <Grid item className={classes.menuSection}>
            <NavLink to="/map" className={classes.nav}>
              StART map
            </NavLink>
            <NavLink to="/account" className={classes.nav}>
              My account
            </NavLink>
            <div className={classes.nav}>
              <AuthNav
                isAuthenticated={isAuthenticated}
                handleLogin={loginWithRedirect}
                handleLogout={logout}
              />
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
