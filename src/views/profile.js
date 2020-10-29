import React from 'react'
import DefaultLayout from '../layouts/default-layout'
import EmbeddedCognitoForm from '../components/forms/EmbeddedCognitoForm'

const Profile = () => {
  return (
    <DefaultLayout>
      <EmbeddedCognitoForm formId="12" />
    </DefaultLayout>
  )
}

export default Profile
