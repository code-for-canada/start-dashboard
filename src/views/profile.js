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

  return (
    <DefaultLayout>
      <EmbeddedCognitoForm
        formId="12"
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

export default Profile
