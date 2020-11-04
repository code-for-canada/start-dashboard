import React from 'react'
import StartMap from 'startto-map'

export default {
  component: StartMap,
  title: 'StartMap'
}

const Template = args => <StartMap {...args} />

export const Default = Template.bind({})
Default.args = {
  googleApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  featuresDataSource: 'https://raw.githubusercontent.com/code-for-canada/start-map/master/public/geojson/ftrs.json',
  wardsDataSource: 'https://raw.githubusercontent.com/code-for-canada/start-map/master/public/geojson/wards.json'
}
