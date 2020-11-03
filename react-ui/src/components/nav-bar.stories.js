import React from 'react'
import NavBar from './nav-bar'
import { action } from '@storybook/addon-actions'

export default {
  component: NavBar,
  title: 'NavBar'
}

const makeMockAuth0Hook = (defaultValues = {}) => () => ({
  isAuthenticated: false,
  user: {},
  logout: action('logged out'),
  loginWithRedirect: action('logged in'),
  ...defaultValues
})

const Template = args => <NavBar {...args} />

export const Default = Template.bind({})
Default.args = {
  useAuthHook: makeMockAuth0Hook()
}

export const LoggedInWithNameClaim = Template.bind({})
LoggedInWithNameClaim.args = {
  useAuthHook: makeMockAuth0Hook({
    isAuthenticated: true,
    user: {
      'https://streetartoronto.ca/name': 'Maria "claim" Rodriguez'
    }
  })
}

export const LoggedInWithNickname = Template.bind({})
LoggedInWithNickname.args = {
  useAuthHook: makeMockAuth0Hook({
    isAuthenticated: true,
    user: {
      nickname: 'Maria "nickname" Rodriguez'
    }
  })
}

export const LoggedOutWithoutUser = Template.bind({})
LoggedOutWithoutUser.args = {
  useAuthHook: makeMockAuth0Hook({
    isAuthenticated: false
  })
}
