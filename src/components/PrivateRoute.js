import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Loading } from './index'

// No idea why this warning can't be resolved.
/* eslint-disable react/display-name */

const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />
    })}
    {...args}
  />
)
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  args: PropTypes.array
}
export default PrivateRoute
