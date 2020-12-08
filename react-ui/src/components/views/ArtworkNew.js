import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import Unauthorized from 'components/views/Unauthorized'
import { COGNITO_FORMS_IDS } from 'utils/constants'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const ArtworkNew = ({ user, isStaff }) => {
  const classes = useStyles()

  if (!isStaff) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout>
      <EmbeddedIframe
        src="https://airtable.com/embed/shrMvrXih5f3TAIbN?backgroundColor=red"
        title="Add a new artwork"
        alwaysEnableScroll={true}
        height={'100%'}
      />
    </DefaultLayout>
  )
}

ArtworkNew.propTypes = {
  user: PropTypes.object,
  isStaff: PropTypes.bool
}

export default ArtworkNew
