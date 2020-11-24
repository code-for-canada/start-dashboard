import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
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

const ProfileNew = ({ user, artist, isStaff }) => {
  const history = useHistory()
  const classes = useStyles()
  let opts = {}

  const afterSubmit = (event, entry) => {
    event.preventDefault()
    history.push('/profile/success')
  }

  if (!artist && !isStaff) {
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

  if (artist && !isStaff) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout>
      <Container maxWidth="md">
        <div className={classes.container}>
          <h1>Create a StART Profile</h1>
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

ProfileNew.propTypes = {
  user: PropTypes.object,
  artist: PropTypes.object,
  isStaff: PropTypes.bool
}

export default ProfileNew
