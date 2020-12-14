import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Loading from 'components/common/Loading'
import useRoles from 'customHooks/useRoles'
import ArtworkView from 'components/views/ArtworkView'
import ArtworkEdit from 'components/views/ArtworkEdit'
import ArtworkNew from 'components/views/ArtworkNew'
import { getResource } from 'utils/apiHelper'

const Artwork = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [artwork, setArtwork] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { action = 'view', id } = useParams()
  const { isLoadingRoles, isStaff } = useRoles()
  const [formData, setFormData] = useState({})

  // fetch the artist profile for the authed user
  useEffect(() => {
    const abortController = new AbortController()
    const fetchArtwork = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'https://dashboard.streetartoronto.ca/'
        })

        const opts = {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        if (!id) {
          console.log('No artwork ID provided')
          return setLoading(false)
        }

        const url = `/api/artworks?id=${id}`

        const { error, artwork } = await getResource({ url, opts })

        if (error) {
          console.log(error)
          return setLoading(false)
        }

        if (artwork) {
          setArtwork(artwork)
        }
        setLoading(false)
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch artwork was aborted')
        } else {
          console.log('Error fetching artwork', err)
          setLoading(false)
        }
      }
    }
    console.log({id})
    fetchArtwork()

    return () => {
      abortController.abort()
    }
  }, [user, getAccessTokenSilently, id])

  console.log({ artwork })

  if (isLoading || isLoadingRoles) {
    return <Loading />
  }

  if (action === 'edit') {
    return <ArtworkEdit user={user} artwork={artwork} setArtwork={setArtwork} isStaff={isStaff} />
  }

  return <Redirect to='/dashboard/staff' />
}

export default Artwork
