import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { Container, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'

import useRoles from 'customHooks/useRoles'
import { getResource, updateResource } from 'utils/apiHelper'
import DefaultLayout from 'components/layouts/DefaultLayout'
import Unauthorized from 'components/views/Unauthorized'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import EmbeddedCognitoIframe from 'components/forms/EmbeddedCognitoIframe'
import { Block, BlockTitle } from 'components/common/Block'
import { COGNITO_FORMS_IDS, EXTERNAL_LINKS } from 'utils/constants'
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

export const ArtworkUnderReview = ({
  artwork,
  isStaff,
  handlePublishArtwork
}) => {
  const classes = useStyles()
  return (
    <div className={classes.alert}>
      <StatusAlert
        severity="info"
        show={artwork?.flagged_for_review}
        action={
          isStaff ? (
            <>
              <Button
                className={classes.button}
                component="a"
                color="inherit"
                size="small"
                href={`${EXTERNAL_LINKS.artworksTable}${artwork?.id}`}
                target="_blank"
                rel="noopener noreferrer">
                Review on Airtable
              </Button>
              <Button
                className={classes.button}
                color="inherit"
                size="small"
                variant="outlined"
                onClick={handlePublishArtwork}>
                Publish now
              </Button>
            </>
          ) : null
        }>
        This artwork is under review.
      </StatusAlert>
    </div>
  )
}

ArtworkUnderReview.propTypes = {
  artwork: PropTypes.object,
  isStaff: PropTypes.bool,
  handlePublishArtwork: PropTypes.func
}

const ArtworkEdit = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const { id } = useParams()
  const { isLoadingRoles, isStaff } = useRoles()
  const [artwork, setArtwork] = useState(null)
  const [notification, setNotification] = useState(null)
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
  }, [user, getAccessTokenSilently, id, artwork, isAuthenticated])

  const handlePublishArtwork = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://dashboard.streetartoronto.ca/'
      })

      const opts = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: id,
          fields: { flagged_for_review: false }
        })
      }

      const resource = 'artworks'

      const { error } = await updateResource({ resource, opts })

      if (error) {
        return setNotification({
          severity: 'error',
          message: error
        })
      }

      setArtwork({ ...artwork, flagged_for_review: false })
      setNotification({
        severity: 'success',
        message:
          'This artwork is no longer under review and the changes will appear on the StART Map.'
      })
    } catch (err) {
      console.log(err)
      setNotification({
        severity: 'error',
        message: err.message
      })
    }
  }

  if (isLoading || isLoadingRoles) {
    return <Loading />
  }

  if (!isStaff && !isOwnWork) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout loading={isLoading || isLoadingRoles}>
      <Container maxWidth="md">
        <div className={classes.container}>
          <ArtworkUnderReview
            artwork={artwork}
            isStaff={isStaff}
            handlePublishArtwork={handlePublishArtwork}
          />
          <div className={classes.alert}>
            <StatusAlert
              severity={notification?.severity}
              message={notification?.message}
              show={Boolean(notification)}
            />
          </div>
          <Block>
            <BlockTitle title={`Edit "${artwork.title}"`} />
            <p>
              Use this form to update the public view of your artwork on the
              StART Map. All the changes made here will be reviewed by the StART
              team before they are published, so it may take a few days before
              your changes are public.
            </p>
            <EmbeddedCognitoForm formId={COGNITO_FORMS_IDS.artwork} />
          </Block>
          {isStaff && artwork && (
            <Block>
              <BlockTitle title="Internal fields" />
              <p>These are the fields that only the StART team can edit.</p>
              <EmbeddedCognitoIframe
                src={`https://www.cognitoforms.com/f/vQtvojkwk0qKXX6uRXdPYA?id=14${artwork.internal_edit_hash}`}
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
