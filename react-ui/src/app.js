import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Loading from 'components/common/Loading'
import PrivateRoute from 'components/common/PrivateRoute'

import Home from 'components/views/Home'
import StatusUpdateNew from 'components/views/StatusUpdateNew'
import Dashboard from 'components/views/Dashboard'
import ArtistDashboard from 'components/views/ArtistDashboard'
import CuratorDashboard from 'components/views/CuratorDashboard'
import ReviewerDashboard from 'components/views/ReviewerDashboard'
import StaffDashboard from 'components/views/StaffDashboard'
import InternalMap from 'components/views/InternalMap'
import LocationNew from 'components/views/LocationNew'
import Profile from 'components/views/Profile'
import ProfileSaved from 'components/views/ProfileSaved'
import Account from 'components/views/Account'
import AccountSaved from 'components/views/AccountSaved'

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
        path="/dashboard"
        component={Dashboard}
        validateEmail={false}
      />
      <PrivateRoute
        path="/dashboard/artist"
        component={ArtistDashboard}
        validateEmail={false}
      />
      <PrivateRoute
        path="/dashboard/curator"
        component={CuratorDashboard}
        validateEmail={false}
      />
      <PrivateRoute
        path="/dashboard/reviewer"
        component={ReviewerDashboard}
        validateEmail={false}
      />
      <PrivateRoute
        path="/dashboard/staff"
        component={StaffDashboard}
        validateEmail={false}
      />
      <PrivateRoute path="/update" component={StatusUpdateNew} />
      <PrivateRoute path="/map" component={InternalMap} />
      <PrivateRoute path="/location" component={LocationNew} />
      <PrivateRoute path="/profile" exact component={Profile} />
      <PrivateRoute path="/profile/success" exact component={ProfileSaved} />
      <PrivateRoute path="/profile/:action" component={Profile} />
      <PrivateRoute path="/account" component={Account} />
      <Route path="/account-updated" component={AccountSaved} />
    </Switch>
  )
}

export default App
