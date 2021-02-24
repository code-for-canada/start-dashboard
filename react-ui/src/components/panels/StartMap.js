import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'
import { createResource, getResource } from 'utils/apiHelper'
import StatusAlert from 'components/common/StatusAlert'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  }
}))

const StartMap = props => {
  const classes = useStyles()
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [alert, setAlert] = useState({})
  const [log, setLog] = useState()

  const triggerPublish = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: 'https://dashboard.streetartoronto.ca/'
      })
      const opts = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const data = await createResource({ url: '/api/deploy', opts })

      if (data.error) {
        console.log(data.error)
        throw new Error(data.error)
      }

      setAlert({
        message: 'The StART Map is being published.',
        severity: 'success'
      })
    } catch (err) {
      setAlert({
        message:
          'We were unable to publish the map. Please try again or contact us.',
        severity: 'warning'
      })
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    const fetchDeployLog = async () => {
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

        const url = `/api/deploy`

        const { error, items } = await getResource({ url, opts })

        if (error) {
          console.log(error)
        }

        if (Boolean(items.length)) {
          setLog(items[0])
        }
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch deploy log was aborted')
        } else {
          console.log('Error fetching deploy log', err)
        }
      }
    }

    if (!log && isAuthenticated) {
      fetchDeployLog()
    }

    return () => {
      abortController.abort()
    }
  }, [getAccessTokenSilently, isAuthenticated, log])

  console.log({log})

  return (
    <div>
      <StatusAlert
        show={Boolean(alert.message)}
        message={alert.message}
        severity={alert.severity}
        className={classes.marginBottom}
      />
      <div>
        {log && <p>{`Last published: ${log.timestamp}`}</p>}
        {log && <p className={classes.marginBottom}>{`Published by: ${log.account_name}`}</p>}
        <Button
          className={classes.button}
          color="secondary"
          variant="contained"
          component="a"
          onClick={triggerPublish}
          disableElevation>
          Publish StART Map
        </Button>
      </div>
    </div>
  )
}

export default StartMap
