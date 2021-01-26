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
  },
  list: {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(2)
  }
}))

export const ArtworkUnderReview = ({
  artwork,
  isStaff,
  handleApproveChanges
}) => {
  const classes = useStyles()
  return (
    <div className={classes.alert}>
      <StatusAlert
        severity="info"
        show={!!artwork?.artwork_updates}
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
                onClick={handleApproveChanges}>
                Approve changes
              </Button>
            </>
          ) : null
        }>
        This artwork has changes pending review.
      </StatusAlert>
    </div>
  )
}

ArtworkUnderReview.propTypes = {
  artwork: PropTypes.object,
  isStaff: PropTypes.bool,
  handleApproveChanges: PropTypes.func
}

const ArtworkEdit = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const { id } = useParams()
  const { isLoadingRoles, isStaff } = useRoles()
  const [artwork, setArtwork] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const classes = useStyles()

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

  const handleApproveChanges = async () => {
    if (!artwork || !artwork.artwork_updates) {
      return console.log('There are no changes to approve')
    }

    try {
      const token = await getAccessTokenSilently({
        audience: 'https://dashboard.streetartoronto.ca/'
      })

      const updateId =
        artwork.artwork_updates[artwork.artwork_updates.length - 1]

      const opts = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: updateId,
          fields: { approved: true }
        })
      }

      const resource = 'artworkUpdates'

      const { error } = await updateResource({ resource, opts })

      if (error) {
        return setNotification({
          severity: 'error',
          message: error
        })
      }

      setArtwork({ ...artwork, artwork_updates: false })
      setNotification({
        severity: 'success',
        message:
          'The changes have been approved and updated on the StART map. Any new media files will now available to be added to the "Featured media" for this artwork.'
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

  if (!isStaff) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout loading={isLoading || isLoadingRoles}>
      <Container maxWidth="md">
        <div className={classes.container}>
          <ArtworkUnderReview
            artwork={artwork}
            isStaff={isStaff}
            handleApproveChanges={handleApproveChanges}
          />
          <div className={classes.alert}>
            <StatusAlert
              severity={notification?.severity}
              message={notification?.message}
              show={Boolean(notification?.message)}
              action={
                notification?.severity === 'success' && (
                  <Button
                    className={classes.button}
                    component="a"
                    color="inherit"
                    size="small"
                    href={`${EXTERNAL_LINKS.artworksTable}${artwork?.id}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    Edit on Airtable
                  </Button>
                )
              }
            />
          </div>
          <Block>
            <BlockTitle
              title={`Review the Public Information for "${artwork?.title}"`}
            />
            <p>
              An artist has made changes to their artwork&apos;s public
              information. Please review the form below and then take one of the
              following actions:
            </p>
            <ul className={classes.list}>
              <li>
                Click &quot;Approve changes&quot; to copy the changes into
                Airtable
              </li>
              <li>
                To make additional changes directly, use the form below to
                submit a new update. You will still need to approve the new
                changes.
              </li>
              <li>
                To request changes from the artist, contact them directly and
                have them resubmit the form.
              </li>
            </ul>
            <EmbeddedCognitoForm formId={COGNITO_FORMS_IDS.artwork_public} />
          </Block>
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
