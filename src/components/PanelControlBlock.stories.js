import React from 'react'
import PanelControlBlock from './PanelControlBlock'
import * as PanelControlBlockItemStories from './PanelControlBlockItem.stories'
//import { action } from '@storybook/addon-actions'

export default {
    component: PanelControlBlock,
    title: 'PanelControlBlock'
}

const Template = args => <PanelControlBlock {...args} />

export const Default = Template.bind({})
Default.args = {
  panels: [
    { ...PanelControlBlockItemStories.Default.args, title: 'Panel 1' },
    { ...PanelControlBlockItemStories.Default.args, title: 'Panel 2' },
    { ...PanelControlBlockItemStories.Default.args, title: 'Panel 3' },
  ]
}
