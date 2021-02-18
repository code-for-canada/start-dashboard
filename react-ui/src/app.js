import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Loading from 'components/common/Loading'
import PrivateRoute from 'components/common/PrivateRoute'

import Unauthorized from 'components/views/Unauthorized'
import PageMissing from 'components/views/PageMissing'
import PrivacyPolicy from 'components/views/PrivacyPolicy'
import FeedbackForm from 'components/views/FeedbackForm'
import Home from 'components/views/Home'
import StatusUpdateNew from 'components/views/StatusUpdateNew'
import Dashboard from 'components/views/Dashboard'
import InternalMap from 'components/views/InternalMap'
import LocationNew from 'components/views/LocationNew'
import LocationEdit from 'components/views/LocationEdit'
import Profile from 'components/views/Profile'
import ProfileSaved from 'components/views/ProfileSaved'
import ProfileNew from 'components/views/ProfileNew'
import Account from 'components/views/Account'
import AccountSaved from 'components/views/AccountSaved'
import AccountDeleted from 'components/views/AccountDeleted'
import ArtworkNew from 'components/views/ArtworkNew'
import ArtworkEdit from 'components/views/ArtworkEdit'
import ArtworkReviewChanges from 'components/views/ArtworkReviewChanges'
import Report from 'components/views/Report'
import ProgressUpdate from 'components/views/ProgressUpdate'
import VerifyEmail from 'components/views/VerifyEmail'

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
      <Route path="/verify-email" component={VerifyEmail} />
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
      <PrivateRoute path="/profile/new/" exact component={ProfileNew} />
      <PrivateRoute path="/profile/new/:account" exact component={ProfileNew} />
      <PrivateRoute path="/profile/:action" component={Profile} />
      <Route exact path="/account/success" component={AccountSaved} />
      <Route exact path="/account/deleted" component={AccountDeleted} />
      <PrivateRoute path="/account" component={Account} />
      <PrivateRoute path="/artwork/new" component={ArtworkNew} />
      <PrivateRoute path="/artwork/edit/:id" component={ArtworkEdit} />
      <PrivateRoute
        path="/artwork/review/:id"
        component={ArtworkReviewChanges}
      />
      <PrivateRoute exact path="/report/:slug" component={Report} />
      <PrivateRoute path="/report/:slug/:responseId" component={Report} />
      <PrivateRoute
        path="/progress-update/:artworkId"
        component={ProgressUpdate}
      />
      <Route path="/unauthorized" component={Unauthorized} />
      <Route path="/404" component={PageMissing} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/feedback" component={FeedbackForm} />
    </Switch>
  )
}

export default App
