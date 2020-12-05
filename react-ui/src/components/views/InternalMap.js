import React from 'react'
import StartMap from 'startto-map'
import DefaultLayout from 'components/layouts/DefaultLayout'

const InternalMap = () => (
  <DefaultLayout>
    <StartMap
      googleApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      featuresDataSource={
        'https://raw.githubusercontent.com/code-for-canada/start-map/master/public/geojson/ftrs.json'
      }
      wardsDataSource={
        'https://raw.githubusercontent.com/code-for-canada/start-map/master/public/geojson/wards.json'
      }
    />
  </DefaultLayout>
)

export default InternalMap
