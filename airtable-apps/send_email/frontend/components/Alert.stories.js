import React from 'react'
import Alert from './Alert'

export default {
  component: Alert,
  title: 'Airtable Apps/Alert'
}

const Template = args => <Alert {...args} />

export const Default = Template.bind({})
Default.args = {
  alert: 'Some message',
}
