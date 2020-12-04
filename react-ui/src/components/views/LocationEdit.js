import React, { useState, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import DefaultLayout from 'components/layouts/DefaultLayout'
import LocationForm from 'components/forms/LocationForm'
import useRoles from 'customHooks/useRoles'
import { getResource, updateResource } from 'utils/apiHelper'
import Unauthorized from 'components/views/Unauthorized'

const LocationEdit = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [location, setLocation] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const { isLoadingRoles, isStaff } = useRoles()
  const { id } = useParams()

  // fetch the location
  useEffect(() => {
    const abortController = new AbortController()
    const getLocationAsync = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'https://dashboard.streetartoronto.ca/'
        })

        const opts = {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`
          },
          query: { id }
        }

        if (!id) {
          console.log('The location ID is required.')
          return setLoading(false)
        }

        const url = `/api/location?id=${id}`
        const data = await getResource({ url, opts })
        const { location, error } = data

        if (error) {
          console.log(data.error)
          return setLoading(false)
        }

        if (location) {
          setLocation(location)
        }
        setLoading(false)
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch location was aborted')
        } else {
          console.log('Error fetching location', err)
          setLoading(false)
        }
      }
    }

    getLocationAsync()

    return () => {
      abortController.abort()
    }
  }, [id, getAccessTokenSilently])

  const handleSubmit = async locationData => {
    const token = await getAccessTokenSilently({
      audience: 'https://dashboard.streetartoronto.ca/'
    })

    const opts = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(locationData)
    }

    const data = await updateResource({ resource: 'location', opts })

    return data
  }

  if (!isLoadingRoles && !isStaff) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout loading={isLoading || isLoadingRoles}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <LocationForm location={location} handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}

export default LocationEdit
