import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'
import { EXTERNAL_LINKS } from 'utils/constants'

const Reports = props => {
  return (
    <div>
      <h3>Report Forms</h3>
      <EmbeddedIframe
        src={
          'https://airtable.com/embed/shrA0F6dW6YZwmamP?backgroundColor=red&viewControls=on'
        }
      />

      <h3>Report Responses</h3>
      <EmbeddedIframe
        src={
          'https://airtable.com/embed/shrNWLDASXGtpK7I4?backgroundColor=red&viewControls=on'
        }
      />

      <div>
        <Button
          color="primary"
          variant="contained"
          component="a"
          href={EXTERNAL_LINKS.reportsTable}
          target="_blank"
          rel="noopener noreferrer">
          Edit in Airtable
        </Button>
      </div>
    </div>
  )
}

export default Reports
