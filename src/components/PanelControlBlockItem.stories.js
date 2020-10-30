import React from 'react'
import PanelControlBlockItem from './PanelControlBlockItem'
import { action } from '@storybook/addon-actions'

export default {
    component: PanelControlBlockItem,
    title: 'PanelControlBlockItem'
}

const Template = args => <PanelControlBlockItem {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Foo',
  isVisible: false,
  toggleVisibility: action('toggleVisibility'),
  moveUp: action('moveUp'),
  moveDown: action('moveDown')
}
