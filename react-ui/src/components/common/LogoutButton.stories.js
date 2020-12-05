import React from 'react'
import LogoutButton from 'components/common/LogoutButton'
import { action } from '@storybook/addon-actions'

export default {
  component: LogoutButton,
  title: 'LogoutButton'
}

const Template = args => <LogoutButton {...args} />

export const Default = Template.bind({})
Default.args = {
  handleLogout: action('logged out')
}
