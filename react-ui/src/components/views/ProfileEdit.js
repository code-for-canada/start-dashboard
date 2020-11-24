import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import Unauthorized from 'components/views/Unauthorized'
import { COGNITO_FORMS_IDS } from 'utils/constants'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const ProfileEdit = ({ user, artist, isStaff }) => {
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()

  // if the user is an artist and has a profile, load their profile
  // if no profile hash is present, load current user's profile
  useEffect(() => {
    if (!artist) return

    const currentProfileHash = location.hash

    if (currentProfileHash) {
      const isOwnProfile = artist.edit_url.includes(currentProfileHash)
      console.log({isOwnProfile})
      setIsOwnProfile(isOwnProfile)
    } else {
      const editProfileHash = artist.edit_url.split('#')[1]
      return history.replace(`${location.pathname}#${editProfileHash}`)
    }
  }, [artist, location, history])

  if (!artist && !isStaff) {
    return <Redirect to='/profile/new' />
  }

  if (isOwnProfile || isStaff) {
    const afterSubmit = (event, entry) => {
      event.preventDefault()
      history.push('/profile/success')
    }

    return (
      <DefaultLayout>
        <Container maxWidth="md">
          <div className={classes.container}>
            <h1>Edit Your StART Profile</h1>
            <EmbeddedCognitoForm
              formId={COGNITO_FORMS_IDS.artistProfile}
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
