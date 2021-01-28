import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import Loading from 'components/common/Loading'

// No idea why this warning can't be resolved.
/* eslint-disable react/display-name */

const PrivateRoute = ({ component, validateEmail = true, ...args }) => {
  const { user, isLoading } = useAuth0()

  if (isLoading) {
    return <Loading />
  }

  if (validateEmail && !user?.email_verified) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />
      })}
      {...args}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  validateEmail: PropTypes.bool,
  args: PropTypes.array
}

export default PrivateRoute
