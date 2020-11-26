import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { Container, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import { COGNITO_FORMS_IDS } from 'utils/constants'
import Unauthorized from 'components/views/Unauthorized'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const ProfileView = ({ artist, isStaff }) => {
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()

  // add profile hash to URL if not present
  useEffect(() => {
    const currentProfileHash = location.hash

    // don't redirect to artist profile if the staff member has an artist profile
    // staff are allowed to see all profiles
    if (currentProfileHash && isStaff) return

    if (artist && !currentProfileHash) {
      const viewProfileHash = artist.view_url.split('#')[1]
      if (!currentProfileHash) {
        return history.replace(`${location.pathname}#${viewProfileHash}`)
      }
    }
  }, [artist, location, history, isStaff])

  useEffect(() => {
    const currentProfileHash = location.hash

    if (artist && currentProfileHash) {
      const isOwnProfile = artist.view_url.includes(currentProfileHash)
      setIsOwnProfile(isOwnProfile)
    }
  }, [artist, location])

  if (isStaff || isOwnProfile) {
    return (
      <DefaultLayout>
        <Container maxWidth="md">
          <div className={classes.container}>
            <h1>
              {isOwnProfile ? 'Your StART Profile' : `StART Artist Profile`}
            </h1>
            <EmbeddedCognitoForm formId={COGNITO_FORMS_IDS.artistProfile} />
            {isOwnProfile && (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={'/profile/edit'}>
                Edit your profile
              </Button>
            )}
          </div>
        </Container>
      </DefaultLayout>
    )
  }

  return <Unauthorized />
}

ProfileView.propTypes = {
  user: PropTypes.object,
  artist: PropTypes.object,
  isStaff: PropTypes.bool
}

export default ProfileView