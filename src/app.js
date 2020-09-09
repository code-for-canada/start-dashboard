import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, Update, Dashboard } from "./views";

import "./app.css";
import "./assets/scss/main.scss";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Home />}
          </Route>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/update" component={Update} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;