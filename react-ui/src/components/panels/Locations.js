import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'
import { EXTERNAL_LINKS } from 'utils/constants'
import useUtilityClasses from 'customHooks/useUtilityClasses'

const Locations = props => {
  const utilClasses = useUtilityClasses()
  return (
    <div>
      <EmbeddedIframe
        src={'https://airtable.com/embed/shrq9Y4H4zVkBhjgx?backgroundColor=red'}
      />

      <h3>All locations</h3>
      <EmbeddedIframe
        src={
          'https://airtable.com/embed/shrKy239MuejuvGhM?backgroundColor=red&viewControls=on'
        }
      />

      <div>
        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          href="/location/new">
          Add new location
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href={EXTERNAL_LINKS.locationsTable}>
          Edit in Airtable
        </Button>
      </div>
    </div>
  )
}

export default Locations
