import React from 'react'
import Panel from './Panel'
import { action } from '@storybook/addon-actions'

export default {
  component: Panel,
  title: 'Panel'
}

const Template = args => (
  <Panel {...args}>
    <div style={{height: '100%', backgroundColor: 'lightgray'}} />
  </Panel>
)

export const Default = Template.bind({})
Default.args = {
  isVisible: false,
  isSmall: true,
  title: "Example Panel",
  toggleVisibility: action('toggle open/close'),
  toggleSize: action('toggle big/small')
}

export const Open = Template.bind({})
Open.args = {
  ...Default.args,
  isVisible: true
}

export const Closed = Template.bind({})
Closed.args = {
  ...Default.args,
  isVisible: false
}

export const Big = Template.bind({})
Big.args = {
  ...Default.args,
  isSmall: false
}

export const Small = Template.bind({})
Small.args = {
  ...Default.args,
  isSmall: true
}
