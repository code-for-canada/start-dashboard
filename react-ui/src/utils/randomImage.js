const getRandomImage = async () => {
  const defaultImg = {
    url:
      'https://dl.airtable.com/.attachmentThumbnails/3c2130dfdc69808dea60fdbb53e85877/22a905bd',
    artist: 'Moises Frank, Rob Matejka, Bareket Kezwer, Mique Michelle'
  }

  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/code-for-canada/start-map/master/public/geojson/ftrs.json'
    )

    const data = await res.json()
    const feature =
      data.features[Math.floor(Math.random() * data.features.length)]

    if (feature.properties.media && feature.properties.media.length > 0) {
      return {
        url: feature.properties.media[0].url,
        artist: feature.properties.artist
      }
    } else {
      throw new Error('no media url')
    }
  } catch {
    return defaultImg
  }
}

export default getRandomImage
