import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { Loading } from '../components'
import useRole from '../components/dashboard/useRole'
import { ProfileView, ProfileEdit } from '.'

const Profile = () => {
  const { user } = useAuth0()
  const [artist, setArtist] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { action = 'view' } = useParams()
  const { isLoadingRole, isStaff } = useRole()

  // fetch the artist profile for the authed user
  useEffect(() => {
    const abortController = new AbortController()
    const getArtist = async () => {
      try {
        const res = await fetch(
          `/api/artist?email=${encodeURIComponent(user.email)}`,
          { signal: abortController.signal }
        )
        const data = await res.json()
        if (data.records.length > 0) {
          const artistRecord = data.records[0]
          setArtist({ ...artistRecord.fields, id: artistRecord.id })
        }
        setLoading(false)
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch Submittable forms was aborted')
        } else {
          console.log('Error fetching Submittable forms', err)
          setLoading(false)
        }
      }
    }

    getArtist()

    return () => {
      abortController.abort()
    }
  }, [user])

  if (isLoading || isLoadingRole) {
    return <Loading />
  }

  if (action === 'edit') {
    return <ProfileEdit user={user} artist={artist} isStaff={isStaff} />
  }

  return <ProfileView artist={artist} isStaff={isStaff} />
}

export default Profile