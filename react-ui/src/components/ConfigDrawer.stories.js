import React from 'react'
import ConfigDrawer from './ConfigDrawer'
import PanelControlBlock from './PanelControlBlock'
import * as PanelControlBlockStories from './PanelControlBlock.stories'

export default {
  component: ConfigDrawer,
  title: 'ConfigDrawer'
}

const Template = args => (
  <div style={{width: '100px'}}>
    <ConfigDrawer {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  children: <div style={{width: '200px', margin: '10px'}}>Ohai!</div>
}

export const WithConfigContent = Template.bind({})
WithConfigContent.args = {
  children: <PanelControlBlock {...PanelControlBlockStories.Default.args} />
}
