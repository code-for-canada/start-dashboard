const ENDPOINTS = {
  forms: '/api/forms',
  artist: '/api/artist',
  location: '/api/location',
  account: '/api/account',
  reports: '/api/reports'
}

const getResource = async ({ resource, url, opts }) => {
  try {
    const apiEndpoint = url || ENDPOINTS[resource]
    const res = await fetch(apiEndpoint, opts)
    const data = await res.json()
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
    const data = await res.json()
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

const getArtist = async ({ opts }) => {
  const url = `${ENDPOINTS.artist}`
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
    const data = await res.json()
    return data
  } catch (err) {
    return { error: err.message }
  }
}

const deleteResource = async ({ resource, url, data, opts }) => {
  try {
    const apiEndpoint = url || ENDPOINTS[resource]
    const res = await fetch(apiEndpoint, {
      method: 'DELETE',
      ...opts
    })
    const data = await res.json()
    console.log({ data })
    return data
  } catch (err) {
    return { error: err.message }
  }
}

export {
  getResource,
  getArtistByEmail,
  getArtist,
  createResource,
  updateResource,
  deleteResource
}
