import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory, Redirect, Link } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'
import ArtworkUpdateForm from 'components/forms/ArtworkUpdateForm'
import Unauthorized from 'components/views/Unauthorized'
import { COGNITO_FORMS_IDS } from 'utils/constants'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const ArtworkEdit = ({ user, artwork, setArtwork, isStaff }) => {
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()

  // if the user is an artist and has a profile, load their profile
  // if no profile hash is present, load current user's profile
  // useEffect(() => {
  //   if (!artist) return

  //   const currentProfileHash = location.hash

  //   if (currentProfileHash) {
  //     const isOwnProfile = artist.edit_url.includes(currentProfileHash)
  //     setIsOwnProfile(isOwnProfile)
  //   } else {
  //     const editProfileHash = artist.edit_url.split('#')[1]
  //     return history.replace(`${location.pathname}#${editProfileHash}`)
  //   }
  // }, [artist, location, history])


  const onSubmit = () => {
    console.log(artwork)
  }

  return (
    <DefaultLayout>
      <Container maxWidth="md">
        <div className={classes.container}>
          <h1>Edit your artwork</h1>
          <ArtworkUpdateForm
            formData={artwork}
            onSubmit={onSubmit}
            setFormData={setArtwork}
          />
        </div>
      </Container>
    </DefaultLayout>
  )
}

ArtworkEdit.propTypes = {
  user: PropTypes.object,
  artist: PropTypes.object,
  isStaff: PropTypes.bool
}

export default ArtworkEdit
