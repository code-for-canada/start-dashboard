import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import Unauthorized from 'components/views/Unauthorized'
import useRoles from 'customHooks/useRoles'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const ArtworkNew = props => {
  const classes = useStyles()
  const { isLoadingRoles, isStaff } = useRoles()

  if (!isLoadingRoles && !isStaff) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout loading={isLoadingRoles}>
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
