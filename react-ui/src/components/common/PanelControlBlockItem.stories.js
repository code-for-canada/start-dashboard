import React from 'react'
import { action } from '@storybook/addon-actions'
import PanelControlBlockItem from 'components/common/PanelControlBlockItem'

export default {
  component: PanelControlBlockItem,
  title: 'PanelControlBlockItem'
}

const Template = args => <PanelControlBlockItem {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Some panel',
  isVisible: false,
  toggleVisibility: action('toggleVisibility'),
  moveUp: action('moveUp'),
  moveDown: action('moveDown')
}
