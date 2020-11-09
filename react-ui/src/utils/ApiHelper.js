const ENDPOINTS = {
  forms: '/api/forms',
  artist: '/api/artist',
  location: '/api/location',
  account: '/api/account'
}

const getResource = async ({ resource, url, opts }) => {
  try {
    const apiEndpoint = url || ENDPOINTS[resource]
    const res = await fetch(apiEndpoint, opts)
    const data = res.json()
    return data
  } catch (err) {
    return { error: err.message }
  }
}

const createResource = async ({ resource, url, opts }) => {
  try {
    const apiEndpoint = url || ENDPOINTS[resource]
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      ...opts
    })
    const data = res.json()
    return data
  } catch (err) {
    return { error: err.message }
  }
}

const getArtistByEmail = async ({ email, opts }) => {
  const url = `${ENDPOINTS.artist}?email=${encodeURIComponent(email)}`
  const result = await getResource({ url, opts })
  return result
}

const updateResource = async ({ resource, url, data, opts }) => {
  try {
    const apiEndpoint = url || ENDPOINTS[resource]
    const res = await fetch(apiEndpoint, {
      method: 'PATCH',
      ...opts
    })
    const data = res.json()
    return data
  } catch (err) {
    return { error: err.message }
  }
}

export { getResource, getArtistByEmail, createResource, updateResource }
