import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth0 } from '@auth0/auth0-react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import Panel from 'components/common/Panel'
import { getResource } from 'utils/apiHelper'

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(2)
  },
  listContainer: {
    maxHeight: '385px',
    overflow: 'auto',
    position: 'relative',
    paddingBottom: '30px',
  },
  gradient: {
    position: 'absolute',
    bottom: theme.spacing(2),
    width: '100%',
    height: '40px',
    background: 'linear-gradient(transparent, white)',
  },
  list: {
    listStyle: 'none',
    paddingLeft: theme.spacing(2),
    marginLeft: 0
  },
}))

const ApplicationsList = () => {
  const [applications, setApplications] = useState([])
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const classes = useStyles()

  useEffect(() => {
    const abortController = new AbortController()

    const getApplications = async () => {
      try {
        const submittableId = user['https://streetartoronto.ca/submittable_staff_id']
        const token = await getAccessTokenSilently({
          audience: 'https://dashboard.streetartoronto.ca/'
        })
        const opts = {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const url = `/api/applications?userid=${submittableId}`

        const data = await getResource({ url, opts })
        console.log({data})

        if (data.error) {
          return console.log(data.error)
        }


        if (data?.items?.length > 0) {
          const applicationsByCategory = {}

          data.items.forEach(app => {
            if (applicationsByCategory[app.category.name]) {
              applicationsByCategory[app.category.name].push(app)
            } else {
              applicationsByCategory[app.category.name] = [app]
            }
          })

          setApplications(applicationsByCategory)
        }
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch Submittable applications was aborted')
        } else {
          console.log('Error fetching Submittable applications', err)
        }
      }
    }

    if (user && isAuthenticated) {
      getApplications()
    }

    return () => {
      abortController.abort()
    }
  }, [user, getAccessTokenSilently, isAuthenticated])

  const categories = Object.keys(applications)

  if (categories.length > 0) {
    return (
      <div>
      {
        categories.map(category => (
          <div key={category}>
            <h3>{category}</h3>
            <div className={classes.listContainer}>
              <ul className={classes.list}>
              {applications[category].map(a => (
                  <li key={a.submission_id} className="mb-2">
                    <a href={a.link} target="_blank" rel="noopener noreferrer">
                      {`[${a.status}] ${a.title} - ${a.submitter.first_name} ${a.submitter.last_name}`}
                    </a>
                  </li>
              ))}
              </ul>
            </div>
            <div className={classes.gradient} />
          </div>
        ))
      }
      </div>
    )
  }

  return <p>No current applications.</p>
}

const ReviewerDashboard = props => {
  const classes = useStyles()

  return (
    <div className="reviewer-view">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className={classes.header}>Advisory Committee Dashboard</h1>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Panel
          title="Submissions Assigned to Me"
          editLink="https://streetartto.submittable.com/"
          editText="View in Submittable"
          isSmall={false}>
          <ApplicationsList />
        </Panel>

        <Panel
          title="Submission Status Board"
          editLink="https://airtable.com/tblcX15UBd7NvgZNz/viwEVrFXgIndPwQYw?blocks=hide"
          editText="Edit in Airtable"
          isSmall={false}>
          <EmbeddedIframe
            title="Submission Status Board"
            src="https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on"
          />
        </Panel>

        <Panel
          title="New Submissions"
          editLink="https://airtable.com/tblcX15UBd7NvgZNz/viw4z8P0p5Uzs1aDw?blocks=hide"
          editText="Edit in Airtable"
          isSmall={false}>
          <EmbeddedIframe
            title="New Submissions"
            src="https://airtable.com/embed/shrbgSefEwH2I8pgM?backgroundColor=red&viewControls=on"
          />
        </Panel>
      </Grid>
    </div>
  )
}

export default ReviewerDashboard
