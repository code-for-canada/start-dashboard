import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layouts/default-layout'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation, useHistory } from 'react-router-dom'
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

  // if the user has a profile, make sure we show it
  useEffect(() => {
    const isShowingProfile = location.hash
    if (artist?.view_url && !isShowingProfile) {
      const profileHash = artist.view_url.split('#')[1]
      history.replace(`/profile#${profileHash}`)
    }
  }, [artist, location, history])

  // checks on whether to show profile or not
  useEffect(() => {
    const profileHash = location.hash
    const hasProfile = !!artist?.view_url

    // authed user with no profile can see empty form
    if (!hasProfile && !profileHash && user) {
      setShowProfile(true)
    }

    // StART Staff can see all profiles
    if (
      profileHash &&
      user['https://streetartoronto.ca/role'] === 'StART Staff'
    ) {
      setShowProfile(true)
    }

    // artist can only see their own profile
    if (profileHash && hasProfile && artist) {
      const isOwnProfile =
        artist.edit_url.includes(profileHash) ||
        artist.view_url.includes(profileHash)
      setShowProfile(isOwnProfile)
    }
  }, [artist, user, location])

  if (isLoading) {
    return <Loading />
  }

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
