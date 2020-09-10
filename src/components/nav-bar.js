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
      activeClassName="router-link-exact-active"
    >
      Dashboard
    </Nav.Link>
    <Nav.Link
      as={RouterNavLink}
      to="/map"
      exact
      activeClassName="router-link-exact-active"
    >
      Map
    </Nav.Link>
  </Nav>
);

const AuthNav = ({ isAuthenticated }) => {
  return (
    <Nav className="justify-content-end ml-4">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Nav>
  );
};

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();
  const userName = user['https://streetartoronto.ca/name']

  return (
    <Navbar bg="light" expand="md" className="px-4">
        <div className="text-bold">
          {`Hi, ${userName}! 👋`}
        </div>
        <MainNav userName={userName} />
        <AuthNav isAuthenticated={isAuthenticated} />
    </Navbar>
  );
};

export default NavBar;
