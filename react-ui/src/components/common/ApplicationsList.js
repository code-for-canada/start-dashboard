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

const useStyles = makeStyles(theme => ({
  table: {
    maxHeight: '385px',
    overflow: 'auto',
    position: 'relative',
    marginBottom: theme.spacing(4)
  },
  loadingContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const ApplicationsList = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
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
          return console.log(data.error)
        }

        if (data?.items?.length > 0) {
          setApplications(applications.concat(data.items))
        }
      } catch (err) {
        setLoading(false)
        if (abortController.signal.aborted) {
          console.log('Request to fetch Submittable applications was aborted')
        } else {
          console.log('Error fetching Submittable applications', err)
        }
      }
    }

    if (isAuthenticated && currentPage < totalPages) {
      getApplications()
    }

    return () => {
      abortController.abort()
    }
  }, [user, getAccessTokenSilently, isAuthenticated, currentPage, totalPages])

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Loading />
      </div>
    )
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
                    <TableCell>Applicant</TableCell>
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
                        <TableCell component="th" scope="row">
                          {a.title}
                        </TableCell>
                        <TableCell>
                          <a
                            href={a.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open the application in Submittable">{`${a.submitter.first_name} ${a.submitter.last_name}`}</a>
                        </TableCell>
                        <TableCell>
                          {a.labels.items.map(l => l.label_text).join(', ')}
                        </TableCell>
                        <TableCell>{a.status}</TableCell>
                        <TableCell>
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
                        <TableCell>{a.reviews.average}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
    )
  }

  return <p>No assigned applications.</p>
}

export default ApplicationsList
