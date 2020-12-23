import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'

import { Block, BlockTitle } from 'components/common/Block'
import { getResource } from 'utils/apiHelper'

const useStyles = makeStyles({
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    marginLeft: 0
  }
})

const ArtworksList = ({ artist }) => {
  const { getAccessTokenSilently } = useAuth0()
  const [artworks, setArtworks] = useState([])
  const classes = useStyles()

  useEffect(() => {
    const abortController = new AbortController()

    const getArtworks = async () => {
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

        const url = `/api/artworks?artist=${artist.email}`
        const data = await getResource({ url, opts })

        if (data.error) {
          return console.log(data.error)
        }

        setArtworks(data.items)
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch artworks was aborted')
        } else {
          console.log('Error fetching artworks', err)
        }
      }
    }

    getArtworks()

    return () => {
      abortController.abort()
    }
  }, [artist, getAccessTokenSilently])

  if (artworks.length > 0) {
    return (
      <Block>
        <BlockTitle title="Your artworks" />
        <ul className={classes.list}>
          {artworks.map(art => (
            <li key={art.id} className="mb-2">
              <a
                href={
                  art.dashboard_edit_url
                }>{`${art.title}, ${art.year}, ${art.program_name}`}</a>
            </li>
          ))}
        </ul>
      </Block>
    )
  }

  return null
}

ArtworksList.propTypes = {
  artist: PropTypes.object,
  user: PropTypes.object
}

export default ArtworksList
