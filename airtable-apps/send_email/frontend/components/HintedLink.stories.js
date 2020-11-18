import React from 'react'
import HintedLink from './HintedLink'

export default {
  component: HintedLink,
  title: 'Airtable Apps/HintedLink'
}

const Template = args => <HintedLink {...args} />

export const Default = Template.bind({})
Default.args = {
  hint: 'Some hint about what to expect',
  children: 'Some Link Text',
  href: 'https://example.com',
  icon: 'star'
}
