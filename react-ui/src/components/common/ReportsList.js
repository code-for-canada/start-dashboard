import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { Block, BlockTitle } from 'components/common/Block'
import { getResource } from 'utils/apiHelper'

const useStyles = makeStyles(theme => ({
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    marginLeft: 0
  },
  listItem: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  link: {
    marginLeft: theme.spacing(2)
  }
}))

const ReportsList = ({ artist }) => {
  const [reports, setReports] = useState([])
  const classes = useStyles()

  useEffect(() => {
    const abortController = new AbortController()

    const getReports = async () => {
      try {
        const opts = { signal: abortController.signal }
        const data = await getResource({ resource: 'reports', opts })

        if (data.error) {
          return console.log(data.error)
        }

        const artistReports = data.items.filter(r =>
          artist.reports.includes(r.id)
        )

        setReports(artistReports)
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch reports was aborted')
        } else {
          console.log('Error fetching reports', err)
        }
      }
    }

    if (artist.reports) {
      getReports()
    }

    return () => {
      abortController.abort()
    }
  }, [artist])

  if (reports.length > 0) {
    return (
      <Block>
        <BlockTitle title="Your reports" />
        <ul className={classes.list}>
          {reports.map(report => {
            const reportResponses = report.report_responses || []
            const artistResponses = artist.report_responses || []
            const responded = artistResponses.find(aRepId =>
              reportResponses.find(rRepId => rRepId === aRepId)
            )

            return (
              <li className={classes.listItem} key={report.id}>
                <div>{report.name}</div>
                <div>
                  {responded ? (
                    <a
                      href={`${report.form_url}/${responded}`}
                      className={classes.link}>
                      Edit report
                    </a>
                  ) : (
                    <a href={`${report.form_url}`} className={classes.link}>
                      Start report
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </Block>
    )
  }

  return null
}

ReportsList.propTypes = {
  artist: PropTypes.object,
  user: PropTypes.object
}

export default ReportsList
