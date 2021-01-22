import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'

import { Block, BlockTitle } from 'components/common/Block'
import { getResource } from 'utils/apiHelper'

const useStyles = makeStyles(theme => ({
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    marginLeft: 0,
  },
  listItem: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  artworkLink: {
    marginLeft: theme.spacing(2)
  }
}))

const ArtworkItem = ({ artwork }) => {
  const classes = useStyles()
  const text = [artwork.title, artwork.year, artwork.program_name].map(i => i).join(', ')

  return (
    <li className={classes.listItem}>
      <div>{text}</div>
      <div className={classes.artworkLinks}>
        <a href={`/artwork/edit/${artwork.id}/${artwork.edit_hash}`} className={classes.artworkLink}>
          Edit
        </a>
        <a href={`/progress-update/${artwork.id}`} className={classes.artworkLink}>
          Send progress update
        </a>
      </div>
    </li>
  )
}

const ArtworksList = ({ artist }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
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

        Promise.all(artist.artworks.map(id => {
            const url = `/api/artworks?id=${id}`
            return getResource({ url, opts })
          })).then(values => {
          console.log({values})
          const arts = values.map(data => {
            const { error, artwork } = data
            if (error) {
              return console.log(error)
            }
            return artwork
          }).filter(i => i) // filter out undefineds

          setArtworks(arts)
        })

      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch artworks was aborted')
        } else {
          console.log('Error fetching artworks', err)
        }
      }
    }

    if (isAuthenticated) {
      getArtworks()
    }

    return () => {
      abortController.abort()
    }
  }, [artist, getAccessTokenSilently, isAuthenticated])

  if (artworks.length > 0) {
    return (
      <Block>
        <BlockTitle title="Your artworks" />
        <ul className={classes.list}>
          {artworks.map(art => (<ArtworkItem key={art.id} artwork={art} />))}
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
