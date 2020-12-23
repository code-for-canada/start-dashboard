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
          <h1>Create a StART Profile</h1>
          {opts && (
            <EmbeddedCognitoForm
              formId={COGNITO_FORMS_IDS.artistProfile}
              opts={opts}
              afterSubmit={afterSubmit}
            />
          )}
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default ProfileNew
