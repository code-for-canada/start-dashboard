import React from 'react'
import { action } from '@storybook/addon-actions'
import Panel from 'components/common/Panel'
import EmbeddedIframe from 'components/common/EmbeddedIframe'

export default {
  component: Panel,
  title: 'Panel'
}

const Template = args => <Panel {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <div style={{ height: '100%', backgroundColor: 'lightgray' }} />,
  isVisible: false,
  isSmall: true,
  title: 'Example Panel',
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

export const CustomIframe = Template.bind({})
CustomIframe.args = {
  ...Default.args,
  isVisible: true,
  title: 'Some Panel',
  editText: 'Edit on Example.com',
  editLink: 'https://example.com',
  children: <EmbeddedIframe src="https://example.com" />
}
