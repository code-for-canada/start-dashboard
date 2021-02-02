import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useAuth0 } from '@auth0/auth0-react'
import Loading from 'components/common/Loading'
import { getResource } from 'utils/apiHelper'
import { Button } from '@material-ui/core'
import StatusAlert from 'components/common/StatusAlert'

const useStyles = makeStyles(theme => ({
  table: {
    maxHeight: '385px',
    overflow: 'auto',
    position: 'relative',
    marginBottom: theme.spacing(4)
  },
  cell: {
    maxWidth: '360px',
    verticalAlign: 'baseline'
  },
  loadingContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  link: {
    fontSize: '0.9em',
    marginRight: theme.spacing(1)
  }
}))

const ApplicationsList = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [errorMessage, setErrorMessage] = useState()
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const classes = useStyles()

  useEffect(() => {
    const abortController = new AbortController()

    const getApplications = async () => {
      try {
        setLoading(true)
        const token = await getAccessTokenSilently({
          audience: 'https://dashboard.streetartoronto.ca/'
        })
        const opts = {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const url = `/api/applications?page=${currentPage + 1}`
        const data = await getResource({ url, opts })

        setCurrentPage(data.current_page)
        setTotalPages(data.total_pages)

        if (data.current_page === data.total_pages) {
          setLoading(false)
        }

        if (data.error) {
          setLoading(false)
          setApplications([])
          setErrorMessage('Error fetching applications from Submittable. Please try again later.')
          return console.log(data.error)
        }

        if (data?.items?.length > 0) {
          setApplications(applications.concat(data.items))
        }
      } catch (err) {
        setLoading(false)
        setApplications([])
        if (abortController.signal.aborted) {
          console.log('Request to fetch Submittable applications was aborted')
        } else {
          console.log('Error fetching applications from Submittable', err)
          setErrorMessage('Error fetching applications from Submittable. Please try again later.')
        }
      }
    }

    if (isAuthenticated && currentPage < totalPages) {
      getApplications()
    }

    return () => {
      abortController.abort()
    }
  }, [user, getAccessTokenSilently, isAuthenticated, currentPage, totalPages, applications])

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Loading />
      </div>
    )
  }

  if (errorMessage) {
    return <StatusAlert message={errorMessage} severity="error" show={true} />
  }

  if (applications.length > 0) {
    const applicationsByCategory = {}

    applications.forEach(app => {
      if (applicationsByCategory[app.category.name]) {
        applicationsByCategory[app.category.name].push(app)
      } else {
        applicationsByCategory[app.category.name] = [app]
      }
    })
    const categories = Object.keys(applicationsByCategory)
    const submittableId =
      user['https://streetartoronto.ca/submittable_staff_id']
    return (
      <div>
        {categories.map(category => (
          <div key={category}>
            <h3>{category}</h3>
            <TableContainer
              component={Paper}
              elevation={0}
              variant="outlined"
              square
              className={classes.table}>
              <Table size="small" aria-label="a dense table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Application</TableCell>
                    <TableCell>Labels</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Reviewed</TableCell>
                    <TableCell>Average score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applicationsByCategory[category].map(a => {
                    const reviewed = a.reviews.items.find(
                      r => r.user_id === submittableId
                    )
                    return (
                      <TableRow key={a.submission_id}>
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.cell}>
                          {a.title}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          <div>{`${a.submitter.first_name} ${a.submitter.last_name}`}</div>
                          <div>
                            <a
                              className={classes.link}
                              href={a.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open the application in Submittable">
                              Open
                            </a>
                            <a
                              className={classes.link}
                              href={`https://streetartto.submittable.com/api/org/submissions/${a.submission_id}/pdf`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Download application as PDF">
                              Download application
                            </a>
                            <a
                              className={classes.link}
                              href={`https://streetartto.submittable.com/api/org/submissions/${a.submission_id}/download`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Download the application files">
                              Download files
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {a.labels.items.map(l => l.label_text).join(', ')}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {a.status}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {reviewed ? (
                            <a
                              href={`https://streetartto.submittable.com/api/org/submissions/${a.submission_id}/reviews/download/rtf`}
                              title="Download reviews">
                              Yes
                            </a>
                          ) : (
                            'No'
                          )}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {a.reviews.average}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
        <div>
          <Button
            color="primary"
            variant="contained"
            component="a"
            href="https://streetartto.submittable.com/submissions"
            target="_blank"
            rel="noopener noreferrer">
            Edit in Submittable
          </Button>
        </div>
      </div>
    )
  }

  return <p>No assigned applications.</p>
}

export default ApplicationsList
