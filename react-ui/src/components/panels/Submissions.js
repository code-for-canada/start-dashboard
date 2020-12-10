import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'
import { EXTERNAL_LINKS } from 'utils/constants'
import useUtilityClasses from 'customHooks/useUtilityClasses'

const Submissions = props => {
  const utilClasses = useUtilityClasses()
  return (
    <div>
      <h3>2020 Submissions by Status</h3>
      <EmbeddedIframe
        src={
          'https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on'
        }
      />

      <h3>New Submissions</h3>
      <EmbeddedIframe
        src={
          'https://airtable.com/embed/shrbgSefEwH2I8pgM?backgroundColor=red&viewControls=on'
        }
      />

      <div>
        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          href="https://streetartto.submittable.com/submissions"
          target="_blank"
          rel="noopener noreferrer">
          Edit on Submittable
        </Button>

        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          href={EXTERNAL_LINKS.submissionsTable}
          target="_blank"
          rel="noopener noreferrer">
          Edit in Airtable
        </Button>
      </div>
    </div>
  )
}

export default Submissions
