import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layouts/default-layout'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { COGNITO_FORMS_IDS } from '../utils/constants'
import EmbeddedCognitoForm from '../components/forms/EmbeddedCognitoForm'
import { Loading } from '../components'

const Profile = () => {
  const { user } = useAuth0()
  const [artist, setArtist] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const location = useLocation()
  const history = useHistory()
  const { action = 'view' } = useParams()

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

  // if the user has a profile, use their profile
  useEffect(() => {
    if (isLoading) return

    const currentProfileHash = location.hash

    if (artist && action === 'edit') {
      const editProfileHash = artist.edit_url.split('#')[1]
      if (!currentProfileHash.includes(editProfileHash)) {
        return history.replace(`${location.pathname}#${editProfileHash}`)
      }
    }

    if (artist && action === 'view') {
      const viewProfileHash = artist.view_url.split('#')[1]
      if (!currentProfileHash.includes(viewProfileHash)) {
        return history.replace(`${location.pathname}#${viewProfileHash}`)
      }
    }

    if (!artist && action === 'view') {
      return history.replace(`/profile/edit`)
    }
  }, [artist, location, history, action, isLoading])

  // checks on whether to show profile or not
  useEffect(() => {
    if (isLoading) return

    const currentProfileHash = location.hash

    // authed user with no profile can see empty form
    if (user && !artist && !currentProfileHash) {
      setShowProfile(true)
    }

    // StART Staff can view and edit all profiles
    if (user['https://streetartoronto.ca/role'] === 'StART Staff') {
      setShowProfile(true)
    }

    // artist can view and edit their own profile
    if (artist && currentProfileHash) {
      const isOwnProfile =
        artist.edit_url.includes(currentProfileHash) ||
        artist.view_url.includes(currentProfileHash)
      setShowProfile(isOwnProfile)
    }
  }, [artist, user, location, isLoading])

  if (isLoading) {
    return <Loading />
  }

  if (showProfile) {
    let opts = {}
    if (action === 'edit' && user) {
      opts = {
        entry: {
          PersonalInformation: {
            EmailAddress: user.email
          }
        }
      }
    }
    return (
      <DefaultLayout>
        <EmbeddedCognitoForm
          formId={COGNITO_FORMS_IDS.artistProfile}
          opts={opts}
          afterSubmit={(event, entry) => {
            event.preventDefault()
            history.push('/profile/success')
          }}
        />
      </DefaultLayout>
    )
  }

  // not their profile
  if (!showProfile) {
    return (
      <DefaultLayout>
        <Container maxWidth="xl">
          <p className="mt-4 mb-1">You must be logged in to see this page.</p>
        </Container>
      </DefaultLayout>
    )
  }
}

export default Profile
