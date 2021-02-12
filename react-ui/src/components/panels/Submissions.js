import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'
import { EXTERNAL_LINKS, IFRAME_URLS } from 'utils/constants'
import useUtilityClasses from 'customHooks/useUtilityClasses'

const Submissions = props => {
  const utilClasses = useUtilityClasses()
  return (
    <div>
      <h3>2020 Submissions by Status</h3>
      <EmbeddedIframe src={IFRAME_URLS.submissionsByStatus} />

      <h3>New Submissions</h3>
      <EmbeddedIframe src={IFRAME_URLS.newSubmissions} />

      <div>
        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          href={EXTERNAL_LINKS.submittable}
          target="_blank"
          rel="noopener noreferrer"
          disableElevation>
          Edit on Submittable
        </Button>

        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          href={EXTERNAL_LINKS.submissionsTable}
          target="_blank"
          rel="noopener noreferrer"
          disableElevation>
          Edit in Airtable
        </Button>
      </div>
    </div>
  )
}

export default Submissions
