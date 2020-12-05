import React from 'react'
import IconButton from 'components/common/IconButton'
import StarIcon from '@material-ui/icons/Star'

export default {
  component: IconButton,
  title: 'IconButton'
}

const Template = args => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <StarIcon />
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}
