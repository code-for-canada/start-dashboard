import React from 'react'
import Kanban from './Kanban'

const data = require('./../../../.storybook/data/kanban.json')

export default {
  component: Kanban,
  title: 'Kanban'
}

const Template = args => <Kanban {...args} />

export const Default = Template.bind({})
Default.args = {
  data: data
}
