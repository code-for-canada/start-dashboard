import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useParams, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import useRoles from 'customHooks/useRoles'
import DefaultLayout from 'components/layouts/DefaultLayout'
import Unauthorized from 'components/views/Unauthorized'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import { Block } from 'components/common/Block'
import { getResource } from 'utils/apiHelper'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const Report = () => {
  const { user, isLoading } = useAuth0()
  const [opts, setOpts] = useState()
  const [report, setReport] = useState()
  const [isLoadingReport, setLoading] = useState()
  const classes = useStyles()
  const { id } = useParams()
  const { hash } = useLocation()
  const { isStaff } = useRoles()

  useEffect(() => {
    const abortController = new AbortController()
    const fetchReport = async () => {
      try {
        const opts = {
          signal: abortController.signal,
        }

        if (!id) {
          console.log('No record ID provided')
          return setLoading(false)
        }

        const url = `/api/reports?id=${id}`

        const { error, record } = await getResource({ url, opts })

        if (error) {
          console.log(error)
          return setLoading(false)
        }

        if (record) {
          setReport(record)
        }
        setLoading(false)
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch report was aborted')
        } else {
          console.log('Error fetching report', err)
          setLoading(false)
        }
      }
    }

    fetchReport()

    return () => {
      abortController.abort()
    }
  }, [id])

  useEffect(() => {
    if (user) {
      setOpts({
        entry: {
          InternalInformation: {
            Auth0AccountId: user.sub,
            AirtableArtistId: user['https://streetartoronto.ca/artist_profile_id'],
            AirtableReportId: id
          }
        }
      })
    }

  }, [user, id])

  if (hash && !isStaff) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout loading={isLoading || isLoadingReport}>
      <Container maxWidth="md">
        <div className={classes.container}>
          <Block>
            {
              report && opts &&
              <EmbeddedCognitoForm
                formId={report.cognito_form_id}
                opts={opts}
              />
            }
          </Block>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Report
