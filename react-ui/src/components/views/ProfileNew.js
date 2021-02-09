import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import Unauthorized from 'components/views/Unauthorized'
import { COGNITO_FORMS_IDS } from 'utils/constants'
import useRoles from 'customHooks/useRoles'
import { Block, BlockTitle } from 'components/common/Block'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const ProfileNew = () => {
  const { user } = useAuth0()
  const { isLoadingRoles, isStaff } = useRoles()
  const { account } = useParams()
  const [opts, setOpts] = useState()
  const [hasProfile, setHasProfile] = useState(false)
  const history = useHistory()
  const classes = useStyles()

  const afterSubmit = (event, entry) => {
    event.preventDefault()
    window.localStorage.setItem('artist-profile-pending', true)
    history.push('/profile/success')
  }

  useEffect(() => {
    if (user) {
      if (account) {
        const firstName = user['https://streetartoronto.ca/first_name']
        const lastName = user['https://streetartoronto.ca/last_name']

        setOpts({
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
        })
      } else {
        setOpts({})
      }
    }
  }, [account, user])

  useEffect(() => {
    const profileId = user['https://streetartoronto.ca/artist_profile_id']
    if (profileId) {
      setHasProfile(true)
    }
  }, [user])

  if (hasProfile && !isStaff) {
    return <Unauthorized />
  }

  if (!account && !isStaff) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout isLoading={isLoadingRoles || !opts}>
      <Container maxWidth="md">
        <div className={classes.container}>
          {opts && (
            <Block>
              <BlockTitle title="Create a StART Profile" />
              {isStaff && (
                <>
                  <p>
                    If you are creating an artist profile on behalf on an
                    artist, please note that only the name and email fields are
                    required to create the profile.
                  </p>
                  <p>
                    Once the profile is saved,{' '}
                    <strong>the artist will receive an email</strong> informing
                    them that they have a StART Artist Profile and prompting
                    them to view and update it.
                  </p>
                  <p>
                    You will be able to access the internal fields for StART
                    Staff once the profile is created.
                  </p>
                </>
              )}
              <EmbeddedCognitoForm
                formId={COGNITO_FORMS_IDS.artistProfile}
                opts={opts}
                afterSubmit={afterSubmit}
              />
            </Block>
          )}
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default ProfileNew
