import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, Update } from "./views";

import "./app.css";
import "./assets/scss/main.scss";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/update" component={Update} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;