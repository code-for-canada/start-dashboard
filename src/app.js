import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { Loading, PrivateRoute } from './components'
import {
  Home,
  Update,
  Dashboard,
  InternalMap,
  LocationForm,
  Profile,
  ProfileCreated
} from './views'

import './assets/scss/main.scss'

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    return <Loading />
  }

  return (
    <Switch>
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Home />}
      </Route>
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/update" component={Update} />
      <PrivateRoute path="/map" component={InternalMap} />
      <PrivateRoute path="/location" component={LocationForm} />
      <PrivateRoute path="/profile" exact component={Profile} />
      <PrivateRoute path="/profile/success" exact component={ProfileCreated} />
      <PrivateRoute path="/profile/:action" component={Profile} />
    </Switch>
  )
}

export default App
