import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layouts/default-layout'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation } from 'react-router-dom'
import { Container } from '@material-ui/core'

const Profile = () => {
  const { user } = useAuth0()
  const [cognitoLoaded, setCognitoLoaded] = useState(false)
  const [artist, setArtist] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const hash = useLocation().hash

  const loadCognito = () => {
    if (window.Cognito) {
      window.Cognito.load('forms', { id: '11' })
      setCognitoLoaded(true)
    }
  }

  // fetch the artist profile for the authed user
  useEffect(() => {
    const getArtist = async () => {
      const res = await fetch(
        `/api/artist?email=${encodeURIComponent(user.email)}`
      )
      const data = await res.json()
      if (data.records.length > 0) {
        const artistRecord = data.records[0]
        setArtist({ ...artistRecord.fields, id: artistRecord.id })
      }
    }
    getArtist()
  }, [user])

  // load the embedded CognitoForm
  useEffect(() => {
    if (!cognitoLoaded && showProfile) {
      loadCognito()
    }
  }, [showProfile, cognitoLoaded])

  // if this is a new profile, prefill the email from authed user
  useEffect(() => {
    const prefillEmail = () => {
      const emailField = document.querySelector('.c-editor-email input') // yikes
      if (emailField) {
        emailField.value = user.email
      }
    }

    if (cognitoLoaded && user && !artist && !hash) {
      // wait for form to finish loading
      window.setTimeout(prefillEmail, 2000) // ugh
    }
  }, [cognitoLoaded, user, artist])

  // checks on whether to show profile or not
  useEffect(() => {
    // authed user with no profile can see empty form
    if (!hash && user) {
      setShowProfile(true)
    }

    // StART Staff can see all profiles
    if (
      Boolean(hash) &&
      user['https://streetartoronto.ca/role'] === 'StART Staff'
    ) {
      setShowProfile(true)
    }

    // artist can only see their own profile
    if (Boolean(hash) && artist) {
      const showProfile =
        artist.edit_url.includes(hash) || artist.view_url.includes(hash)
      setShowProfile(showProfile)
    }
  }, [artist, user])

  if (showProfile) {
    return (
      <DefaultLayout>
        <div className="cognito mt-4 mb-1"></div>
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
