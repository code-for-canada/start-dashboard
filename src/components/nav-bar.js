import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";


const MainNav = () => (
  <Nav className="ml-auto">
    <Nav.Link
      as={RouterNavLink}
      to="/"
      exact
      className="text-dark"
      activeClassName="router-link-exact-active"
    >
      Dashboard
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/map"
      exact
      className="text-dark"
      activeClassName="router-link-exact-active"
    >
      Map
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/location"
      exact
      className="text-dark"
      activeClassName="router-link-exact-active"
    >
      Add location
    </Nav.Link>
  </Nav>
);

const AuthNav = ({ isAuthenticated }) => {
  return (
    <Nav className="justify-content-end ml-md-4">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Nav>
  );
};

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();
  const userName = user['https://streetartoronto.ca/name'] || user.nickname

  return (
    <Navbar bg="white" expand="md" collapseOnSelect className="px-4 shadow-depth">
      <Container fluid>
        <Nav.Link
          as={RouterNavLink}
          to="/"
          exact
          className="text-dark text-bold"
          activeClassName="router-link-exact-active"
        >
          {userName ? `Hi, ${userName}! 👋` : 'StART Guest' }
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <MainNav userName={userName} />
          <AuthNav isAuthenticated={isAuthenticated} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
