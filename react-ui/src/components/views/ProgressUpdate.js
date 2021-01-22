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
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import { Block, BlockTitle } from 'components/common/Block'
import { COGNITO_FORMS_IDS } from 'utils/constants'
import Loading from 'components/common/Loading'

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

const ProgressUpdate = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const { artworkId } = useParams()
  const { isLoadingRoles, isStaff } = useRoles()
  const [artwork, setArtwork] = useState(null)
  const [isOwnWork, setIsOwnWork] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [options, setOptions] = useState()
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

        if (!artworkId) {
          console.log('No artwork ID provided')
          return setLoading(false)
        }

        const url = `/api/artworks?id=${artworkId}`

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
    if (!artwork) {
      fetchArtwork()
    }

    return () => {
      abortController.abort()
    }
  }, [user, getAccessTokenSilently, artworkId, artwork])

  useEffect(() => {
    if (artwork) {
      setOptions({
        entry: {
          ArtworkTitle: `${artwork.title}`,
          Location: `${artwork.address}`,
          ArtworkAirtableID: artwork.id
        }
      })
    }
  }, [artwork, user])

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
          <Block>
            <BlockTitle title={`Progress Update for "${artwork.title}"`} />
            {options && (
              <EmbeddedCognitoForm
                formId={COGNITO_FORMS_IDS.progressUpdate}
                opts={options}
              />
            )}
          </Block>
        </div>
      </Container>
    </DefaultLayout>
  )
}

ProgressUpdate.propTypes = {
  user: PropTypes.object,
  artist: PropTypes.object,
  isStaff: PropTypes.bool
}

export default ProgressUpdate
