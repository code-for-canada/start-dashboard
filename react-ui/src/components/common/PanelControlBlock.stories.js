import React from 'react'
import PanelControlBlock from 'components/common/PanelControlBlock'
import * as PanelControlBlockItemStories from 'components/common/PanelControlBlockItem.stories'

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
    { ...PanelControlBlockItemStories.Default.args, title: 'Panel 3' }
  ]
}
