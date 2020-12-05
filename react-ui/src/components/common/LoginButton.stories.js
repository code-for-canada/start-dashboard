import React from 'react'
import LoginButton from 'components/common/LoginButton'
import { action } from '@storybook/addon-actions'

export default {
  component: LoginButton,
  title: 'LoginButton'
}

const Template = args => <LoginButton {...args} />

export const Default = Template.bind({})
Default.args = {
  handleLogin: action('logged in')
}
