import React from 'react'
import Kanban from './Kanban'

const data = require('./../../../.storybook/data/kanban-artworks.json')

const populateMetadata = data => ({
  lanes: data.lanes.map(lane => ({
    ...lane,
    label: lane.cards.length.toString(),
    cards: lane.cards.map(card => ({
      ...card,
      metadata: card
    }))
  }))
})

const populatedData = populateMetadata(data)

export default {
  component: Kanban,
  title: 'Kanban Board/Kanban'
}

const Template = args => <Kanban {...args} />

export const Default = Template.bind({})
Default.args = {
  airtableViewUrl: 'https://airtable.com/tbl5ApSEOzPpe4fwp/viw2swQLeJ9xwU82F',
  data: populatedData
}
