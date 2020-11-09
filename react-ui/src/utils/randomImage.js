const getRandomImage = async () => {
  const defaultImg =
  'https://dl.airtable.com/.attachments/bf85b19d45989b61b38d0499a0c9ab3d/bcb3bc8b/UNADJUSTEDRAW_thumb_f416.jpg'

  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/code-for-canada/start-map/master/public/geojson/ftrs.json'
    )

    const data = await res.json()
    const feature = data.features[Math.floor(Math.random() * data.features.length)]

    if (feature.properties.media && feature.properties.media.length > 0) {
      return feature.properties.media[0].url
    } else {
      throw new Error('no media url')
    }
  } catch {
    return defaultImg
  }
}

export default getRandomImage