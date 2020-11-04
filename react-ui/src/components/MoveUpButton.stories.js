import React from 'react'
import MoveUpButton from './MoveUpButton'

export default {
    component: MoveUpButton,
    title: 'MoveUpButton'
}

const Template = args => <MoveUpButton />

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}
