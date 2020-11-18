import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
// import { action } from '@storybook/addon-actions'

export default {
  component: EmbeddedIframe,
  title: 'EmbeddedIframe'
}

const Template = args => <EmbeddedIframe {...args} />

export const Default = Template.bind({})
Default.args = {
  src:
    'https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on',
  style: {},
  title: 'Testing'
}
