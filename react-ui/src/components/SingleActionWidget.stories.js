import React from 'react'
import SingleActionWidget from './SingleActionWidget'

export default {
  component: SingleActionWidget,
  title: 'SingleActionWidget'
}

const Template = args => <SingleActionWidget {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'List of Items',
  options: [
    { name: 'Item 1', tag: 'Tag A' },
    { name: 'Item 2', tag: 'Tag B' },
    { name: 'Item 3', tag: 'Tag C' }
  ]
}

export const AlternateOptionLabel = Template.bind({})
AlternateOptionLabel.args = {
  ...Default.args,
  optionLabelKey: 'tag'
}

export const AlternateInputLabel = Template.bind({})
AlternateInputLabel.args = {
  ...Default.args,
  label: 'Alternative Label'
}
