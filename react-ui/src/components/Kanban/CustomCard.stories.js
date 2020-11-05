import React from 'react'
import CustomCard from './CustomCard'

const artworkData = {
  id: 'recDiogvIMmmefeKs',
  media: 'https://dl.airtable.com/.attachmentThumbnails/0ce069864d50a15f7ae81479bb893e10/e7c55186',
  location: 'Danforth Ave & Amroth Ave',
  title: 'Emilia Jajus',
  program: 'Partnership Program',
  artist: 'Emilia Jajus',
  partner: 'Seeds of Hope Foundation',
  year: 2012,
  description: 'The Bell Box Murals project has transformed utility cabinets into works of art. This piece is an interpretation of a historical photograph of horses and wagons on old Danforth Avenue.',
  ward: 19,
  status: ['Published']
}

export default {
  component: CustomCard,
  title: 'Kanban Board/CustomCard'
}

const Template = args => <CustomCard {...args} />

export const Default = Template.bind({})
Default.args = {
  ...artworkData
}
