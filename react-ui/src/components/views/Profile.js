import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Loading from 'components/common/Loading'
import useRoles from 'customHooks/useRoles'
import ProfileView from 'components/views/ProfileView'
import ProfileEdit from 'components/views/ProfileEdit'
import ProfileNew from 'components/views/ProfileNew'
import { getArtist } from 'utils/apiHelper'

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [artist, setArtist] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { action = 'view' } = useParams()
  const { isLoadingRoles, isStaff } = useRoles()

  // fetch the artist profile for the authed user
  useEffect(() => {
    const abortController = new AbortController()
    const getArtistProfile = async () => {
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

        const profileId = user['https://streetartoronto.ca/artist_profile_id']

        if (!profileId) {
          console.log('This account does not have a profile.')
          return setLoading(false)
        }

        const data = await getArtist({ opts })

        if (data.error) {
          console.log(data.error)
          return setLoading(false)
        }

        if (data.record) {
          const artistRecord = data.record
          setArtist({ ...artistRecord.fields, id: artistRecord.id })
        }
        setLoading(false)
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch artist was aborted')
        } else {
          console.log('Error fetching artist', err)
          setLoading(false)
        }
      }
    }

    getArtistProfile()

    return () => {
      abortController.abort()
    }
  }, [user, getAccessTokenSilently])

  if (isLoading || isLoadingRoles) {
    return <Loading />
  }

  if (action === 'edit') {
    return <ProfileEdit user={user} artist={artist} isStaff={isStaff} />
  }

  if (action === 'new') {
    return <ProfileNew user={user} artist={artist} isStaff={isStaff} />
  }

  return <ProfileView artist={artist} isStaff={isStaff} />
}

export default Profile
