import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { EXTERNAL_LINKS, IFRAME_URLS } from 'utils/constants'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  }
}))

const Reports = props => {
  const classes = useStyles()
  return (
    <div>
      <h3>Report Forms</h3>
      <EmbeddedIframe src={IFRAME_URLS.allReports} />

      <h3>Report Responses</h3>
      <EmbeddedIframe src={IFRAME_URLS.reportResponses} />

      <div>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          component="a"
          href={EXTERNAL_LINKS.reportsTable}
          target="_blank"
          rel="noopener noreferrer">
          Edit in Airtable
        </Button>

        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          component="a"
          href={EXTERNAL_LINKS.cognitoForms}
          target="_blank"
          rel="noopener noreferrer">
          Edit in Cognito Forms
        </Button>
      </div>
    </div>
  )
}

export default Reports
