import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import Unauthorized from 'components/views/Unauthorized'
import { COGNITO_FORMS_IDS } from 'utils/constants'

const ProfileEdit = ({ user, artist, isStaff }) => {
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const location = useLocation()
  const history = useHistory()

  // if the user is an artist and has a profile, load their profile
  useEffect(() => {
    const currentProfileHash = location.hash

    // don't redirect to artist profile if the staff member has an artist profile
    if (currentProfileHash && isStaff) return

    if (artist) {
      const editProfileHash = artist.edit_url.split('#')[1]

      if (!currentProfileHash.includes(editProfileHash)) {
        return history.replace(`${location.pathname}#${editProfileHash}`)
      }
    }
  }, [artist, location, history, isStaff])

  useEffect(() => {
    const currentProfileHash = location.hash

    if (!artist && !currentProfileHash) {
      setIsOwnProfile(true)
    }

    if (artist && currentProfileHash) {
      const isOwnProfile = artist.edit_url.includes(currentProfileHash)
      setIsOwnProfile(isOwnProfile)
    }
  }, [artist, location])

  if (isOwnProfile) {
    const opts = {
      entry: {
        PersonalInformation: {
          EmailAddress: user.email
        }
      }
    }

    const afterSubmit = (event, entry) => {
      event.preventDefault()
      history.push('/profile/success')
    }

    return (
      <DefaultLayout>
        <Container maxWidth="md">
          <div className="my-5">
            <h1>{`${artist ? 'Edit ' : 'Create '} Your StART Profile`}</h1>
            <EmbeddedCognitoForm
              formId={COGNITO_FORMS_IDS.artistProfile}
              opts={opts}
              afterSubmit={afterSubmit}
            />
          </div>
        </Container>
      </DefaultLayout>
    )
  }

  return <Unauthorized />
}

ProfileEdit.propTypes = {
  user: PropTypes.object,
  artist: PropTypes.object,
  isStaff: PropTypes.bool
}

export default ProfileEdit
