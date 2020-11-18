import React from 'react'
import SingleActionWidgetArtwork from 'components/common/SingleActionWidgetArtwork'

export default {
  component: SingleActionWidgetArtwork,
  title: 'SingleActionWidgetArtwork'
}

const Template = args => <SingleActionWidgetArtwork {...args} />

const SAMPLE_ARTWORKS = [
  {
    id: 'recCNhOwdXV62S1xI',
    title: 'Tak Bui',
    location: 'Danforth Ave & Barrington Ave'
  },
  {
    id: 'recxxxxxxxxxxxxx2',
    title: 'Under the Radar',
    location: '47 Denison Ave'
  },
  {
    id: 'recxxxxxxxxxxxxx3',
    title: 'Emilia Jajus',
    location: 'Danforth Ave & Amroth Ave'
  },
  {
    id: 'recxxxxxxxxxxxxx4',
    title: 'Pascal Paquette',
    location: '192 Augusta Ave'
  },
  {
    id: 'recxxxxxxxxxxxxx5',
    title: 'Youth of Thorncliffe Park',
    location: '80 Thorncliffe Park Dr'
  }
]

export const Default = Template.bind({})
Default.args = {
  options: SAMPLE_ARTWORKS,
  buttonLabel: 'Submit Update'
}
