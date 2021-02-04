import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory, Redirect, Link } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import EmbeddedCognitoIframe from 'components/forms/EmbeddedCognitoIframe'
import Unauthorized from 'components/views/Unauthorized'
import { COGNITO_FORMS_IDS } from 'utils/constants'
import { Block, BlockTitle } from 'components/common/Block'

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

  console.log({ artist })

  // if the user is an artist and has a profile, load their profile
  // if no profile hash is present, load current user's profile
  useEffect(() => {
    if (!artist) return

    const currentProfileHash = location.hash

    if (currentProfileHash) {
      const isOwnProfile = artist.edit_url.includes(currentProfileHash)
      setIsOwnProfile(isOwnProfile)
    } else {
      const editProfileHash = artist.edit_url.split('#')[1]
      return history.replace(`${location.pathname}#${editProfileHash}`)
    }
  }, [artist, location, history])

  if (!artist && !isStaff) {
    return <Redirect to="/profile/new" />
  }

  if (isOwnProfile || isStaff) {
    const afterSubmit = (event, entry) => {
      event.preventDefault()
      history.push('/profile/success')
    }

    let opts = {}

    if (isOwnProfile) {
      const firstName = user['https://streetartoronto.ca/first_name']
      const lastName = user['https://streetartoronto.ca/last_name']

      opts = {
        entry: {
          PersonalInformation: {
            EmailAddress: user.email,
            Name: {
              First: firstName,
              Last: lastName
            }
          },
          InternalInformation: {
            AirtableAccountId: user.sub
          }
        }
      }
    }

    return (
      <DefaultLayout>
        <Container maxWidth="md">
          <div className={classes.container}>
            <Block>
              <BlockTitle title="Edit Your StART Profile" />
              <p>
                {`To update your name or email address, go to `}
                <Link to="/account">My account.</Link>
              </p>
              <EmbeddedCognitoForm
                formId={COGNITO_FORMS_IDS.artistProfile}
                opts={opts}
                afterSubmit={afterSubmit}
              />
            </Block>
            {isStaff && artist && (
              <Block>
                <BlockTitle title="Internal Information" />
                <p>
                  These are the fields that only the StART team can edit.
                </p>
                <EmbeddedCognitoIframe
                  src={`https://www.cognitoforms.com/f/vQtvojkwk0qKXX6uRXdPYA?id=${COGNITO_FORMS_IDS.artistProfileInternal}${artist.internal_edit_hash}`}
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

ProfileEdit.propTypes = {
  user: PropTypes.object,
  artist: PropTypes.object,
  isStaff: PropTypes.bool
}

export default ProfileEdit
