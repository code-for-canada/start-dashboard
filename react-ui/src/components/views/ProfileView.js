import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { Container, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import EmbeddedCognitoIframe from 'components/forms/EmbeddedCognitoIframe'
import { COGNITO_FORMS_IDS } from 'utils/constants'
import Unauthorized from 'components/views/Unauthorized'
import { Block, BlockTitle } from 'components/common/Block'

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
      if (!currentProfileHash) {
        return history.replace(`${location.pathname}#${artist.view_hash}`)
      }
    }
  }, [artist, location, history, isStaff])

  useEffect(() => {
    const currentProfileHash = location.hash

    if (artist && currentProfileHash) {
      const isOwnProfile = artist.view_hash === currentProfileHash
      setIsOwnProfile(isOwnProfile)
    }
  }, [artist, location])

  if (isStaff || isOwnProfile) {
    return (
      <DefaultLayout>
        <Container maxWidth="md">
          <div className={classes.container}>
            <Block>
              <BlockTitle
                title={
                  isOwnProfile ? 'Your StART Profile' : `StART Artist Profile`
                }
              />
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
            </Block>
            {isStaff && artist && (
              <Block>
                <BlockTitle title="Internal Information" />
                <p>
                  These are the fields that only the StART team can edit.
                </p>
                <EmbeddedCognitoIframe
                  src={`https://www.cognitoforms.com/f/vQtvojkwk0qKXX6uRXdPYA?id=${COGNITO_FORMS_IDS.artistProfileInternal}${artist.internal_view_hash}`}
                  title="Edit artist profile internal fields"
                />
              </Block>
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
