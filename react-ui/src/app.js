import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Loading from 'components/common/Loading'
import PrivateRoute from 'components/common/PrivateRoute'

import Home from 'components/views/Home'
import StatusUpdateNew from 'components/views/StatusUpdateNew'
import Dashboard from 'components/views/Dashboard'
import InternalMap from 'components/views/InternalMap'
import LocationNew from 'components/views/LocationNew'
import LocationEdit from 'components/views/LocationEdit'
import Profile from 'components/views/Profile'
import ProfileSaved from 'components/views/ProfileSaved'
import Account from 'components/views/Account'
import AccountSaved from 'components/views/AccountSaved'
import AccountDeleted from 'components/views/AccountDeleted'
import ArtworkNew from 'components/views/ArtworkNew'
import ArtworkEdit from 'components/views/ArtworkEdit'
import Unauthorized from 'components/views/Unauthorized'

import 'assets/scss/main.scss'

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
      <PrivateRoute
        path="/dashboard/:action"
        component={Dashboard}
        validateEmail={false}
      />
      <PrivateRoute
        path="/dashboard"
        component={Dashboard}
        validateEmail={false}
      />
      <PrivateRoute path="/update" component={StatusUpdateNew} />
      <PrivateRoute path="/map" component={InternalMap} />
      <PrivateRoute path="/location/new" component={LocationNew} />
      <PrivateRoute path="/location/edit/:id" component={LocationEdit} />
      <PrivateRoute path="/profile" exact component={Profile} />
      <PrivateRoute path="/profile/success" exact component={ProfileSaved} />
      <PrivateRoute path="/profile/:action" component={Profile} />
      <Route exact path="/account/success" component={AccountSaved} />
      <Route exact path="/account/deleted" component={AccountDeleted} />
      <PrivateRoute path="/account" component={Account} />
      <PrivateRoute path="/artworks/new" component={ArtworkNew} />
      <PrivateRoute path="/artworks/edit/:id" component={ArtworkEdit} />
      <Route path="/unauthorized" component={Unauthorized} />
    </Switch>
  )
}

export default App
