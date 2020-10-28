import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layouts/default-layout'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation, useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { COGNITO_FORMS_IDS } from '../utils/constants'
import EmbeddedCognitoForm from '../components/forms/EmbeddedCognitoForm'

const Profile = () => {
  const { user } = useAuth0()
  const [artist, setArtist] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const location = useLocation()
  const history = useHistory()

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
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch Submittable forms was aborted')
        } else {
          console.log('Error fetching Submittable forms', err)
        }
      }
    }

    getArtist()

    return () => {
      abortController.abort()
    }
  }, [user])

  // checks on whether to show profile or not
  useEffect(() => {
    const hash = location.hash
    const hasProfile = !!hash

    // authed user with no profile can see empty form
    if (!hasProfile && user) {
      setShowProfile(true)
    }

    // StART Staff can see all profiles
    if (
      hasProfile &&
      user['https://streetartoronto.ca/role'] === 'StART Staff'
    ) {
      setShowProfile(true)
    }

    // artist can only see their own profile
    if (hasProfile && artist) {
      const isOwnProfile =
        artist.edit_url.includes(hash) || artist.view_url.includes(hash)
      setShowProfile(isOwnProfile)
    }
  }, [artist, user, location])

  if (showProfile) {
    return (
      <DefaultLayout>
        <EmbeddedCognitoForm
          formId={COGNITO_FORMS_IDS.artistProfile}
          opts={{
            entry: {
              PersonalInformation: {
                EmailAddress: user.email
              }
            }
          }}
          afterSubmit={(event, entry) => {
            event.preventDefault()
            console.log(entry)
            history.push('/dashboard')
          }}
        />
      </DefaultLayout>
    )
  }

  // not their profile
  if (!showProfile) {
    return (
      <DefaultLayout>
        <Container>
          <p className="mt-4 mb-1">You must be logged in to see this page.</p>
        </Container>
      </DefaultLayout>
    )
  }
}

export default Profile
