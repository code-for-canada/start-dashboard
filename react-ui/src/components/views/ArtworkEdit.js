import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'

import useRoles from 'customHooks/useRoles'
import { getResource } from 'utils/apiHelper'
import DefaultLayout from 'components/layouts/DefaultLayout'
import Unauthorized from 'components/views/Unauthorized'
import PageMissing from 'components/views/PageMissing'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import EmbeddedCognitoIframe from 'components/forms/EmbeddedCognitoIframe'
import { Block, BlockTitle } from 'components/common/Block'
import { COGNITO_FORMS_IDS } from 'utils/constants'
import Loading from 'components/common/Loading'
import StatusAlert from 'components/common/StatusAlert'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  alert: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(1)
  }
}))

export const ArtworkUnderReview = ({ artwork }) => {
  const classes = useStyles()
  return (
    <div className={classes.alert}>
      <StatusAlert severity="info" show={!!artwork?.artwork_updates}>
        This artwork has changes pending review. You can continue editing; when
        it is reviewed by StART Staff, they will only see the most recent
        version.
      </StatusAlert>
    </div>
  )
}

ArtworkUnderReview.propTypes = {
  artwork: PropTypes.object
}

const ArtworkEdit = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const { id } = useParams()
  const { isLoadingRoles, isStaff } = useRoles()
  const [artwork, setArtwork] = useState(null)
  const [isOwnWork, setIsOwnWork] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const classes = useStyles()

  // check if this is artwork belongs to the user
  useEffect(() => {
    if (!user || !artwork) return

    const profileId = user['https://streetartoronto.ca/artist_profile_id']
    const isOwner = profileId && artwork.artist_profile?.includes(profileId)
    setIsOwnWork(isOwner)
  }, [user, artwork])

  useEffect(() => {
    const abortController = new AbortController()
    const fetchArtwork = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'https://dashboard.streetartoronto.ca/'
        })

        const opts = {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        if (!id) {
          console.log('No artwork ID provided')
          return setLoading(false)
        }

        const url = `/api/artworks?id=${id}`

        const { error, artwork } = await getResource({ url, opts })

        if (error) {
          console.log(error)
          return setLoading(false)
        }

        if (artwork) {
          setArtwork(artwork)
        }
        setLoading(false)
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch artwork was aborted')
        } else {
          console.log('Error fetching artwork', err)
          setLoading(false)
        }
      }
    }

    if (!artwork && isAuthenticated) {
      fetchArtwork()
    }

    return () => {
      abortController.abort()
    }
  }, [user, getAccessTokenSilently, id, isAuthenticated, artwork])

  if (isLoading || isLoadingRoles) {
    return <Loading />
  }

  if (!isStaff && !isOwnWork) {
    return <Unauthorized />
  }

  if (!artwork) {
    return <PageMissing />
  }

  return (
    <DefaultLayout loading={isLoading || isLoadingRoles}>
      <Container maxWidth="md">
        <div className={classes.container}>
          <ArtworkUnderReview artwork={artwork} />
          <Block>
            <BlockTitle title={`Edit "${artwork.display_title}"`} />
            <p>
              Use this form to update the public view of your artwork on the
              StART Map. All the changes made here will be reviewed by the StART
              team before they are published, so it may take a few days before
              your changes are public.
            </p>
            <EmbeddedCognitoForm formId={COGNITO_FORMS_IDS.artworkPublic} />
          </Block>
          {isStaff && artwork && (
            <Block>
              <BlockTitle title="Internal fields" />
              <p>
                These are the fields that only the StART team can edit. These
                changes do not need to be reviewed or approved and will be
                available on the public map immediately.
              </p>
              <EmbeddedCognitoIframe
                src={`https://www.cognitoforms.com/f/vQtvojkwk0qKXX6uRXdPYA?id=${COGNITO_FORMS_IDS.artworkInternal}${artwork.internal_edit_hash}`}
                title="Edit artwork internal fields"
              />
            </Block>
          )}
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
