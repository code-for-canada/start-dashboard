import React from 'react'
import PropTypes from 'prop-types'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import { Container, Grid } from '@material-ui/core'

import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from 'components/common/LogoutButton'
import LoginButton from 'components/common/LoginButton'

const StaffNav = () => (
  <Nav className="ml-auto">
    <Nav.Link
      as={RouterNavLink}
      to="/"
      exact
      className="text-dark"
      activeClassName="router-link-exact-active">
      Dashboard
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/map"
      exact
      className="text-dark"
      activeClassName="router-link-exact-active">
      Map
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/location"
      exact
      className="text-dark"
      activeClassName="router-link-exact-active">
      Add location
    </Nav.Link>
  </Nav>
)

const ArtistNav = () => (
  <Nav className="ml-auto">
    <Nav.Link href="https://streetartoronto.ca/" className="text-dark">
      StART Map
    </Nav.Link>
  </Nav>
)

const AuthNav = ({
  isAuthenticated = true,
  handleLogin = () => {},
  handleLogout = () => {}
}) => {
  return (
    <Nav className="justify-content-end">
      <Nav.Link
        as={RouterNavLink}
        to="/account"
        exact
        className="text-dark"
        activeClassName="router-link-exact-active">
        My Account
      </Nav.Link>
      {isAuthenticated ? (
        <div className="pl-2">
          <LogoutButton handleLogout={handleLogout} />
        </div>
      ) : (
        <div className="pl-2">
          <LoginButton handleLogin={handleLogin} />
        </div>
      )}
    </Nav>
  )
}
AuthNav.propTypes = {
  handleLogin: PropTypes.func,
  handleLogout: PropTypes.func,
  isAuthenticated: PropTypes.bool
}

const renderNavLinks = role => {
  switch (role) {
    case 'StART Staff':
      return <StaffNav />
    case 'Artist':
      return <ArtistNav />
    default:
      return null
  }
}

const NavBar = ({ useAuthHook = useAuth0 }) => {
  const { isAuthenticated, user, logout, loginWithRedirect } = useAuthHook()
  const userName = user
    ? user['https://streetartoronto.ca/first_name'] || user.nickname
    : 'Guest'
  const role = user
    ? user['https://streetartoronto.ca/role'] || 'Artist'
    : 'Artist' // TODO: this should probably be set as a constant

  return (
    <Navbar
      bg="white"
      expand="md"
      collapseOnSelect
      className="shadow-depth px-0">
      <Container maxWidth="xl">
        <Grid container justify="space-between">
          <Grid item>
            <Nav.Link
              as={RouterNavLink}
              to="/"
              exact
              className="text-dark text-bold pl-0"
              activeClassName="router-link-exact-active">
              {userName ? `Hi, ${userName}! 👋` : 'StART Guest'}
            </Nav.Link>
          </Grid>
          <Grid item>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {renderNavLinks(role)}
              <AuthNav
                isAuthenticated={isAuthenticated}
                handleLogin={() => loginWithRedirect()}
                handleLogout={() =>
                  logout({ returnTo: window.location.origin })
                }
              />
            </Navbar.Collapse>
          </Grid>
        </Grid>
      </Container>
    </Navbar>
  )
}

export default NavBar
