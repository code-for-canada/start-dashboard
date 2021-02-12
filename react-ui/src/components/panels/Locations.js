import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'
import { EXTERNAL_LINKS, IFRAME_URLS } from 'utils/constants'
import useUtilityClasses from 'customHooks/useUtilityClasses'

const Locations = props => {
  const utilClasses = useUtilityClasses()
  return (
    <div>
      <EmbeddedIframe src={IFRAME_URLS.locationsMap} />

      <h3>All locations</h3>
      <EmbeddedIframe src={IFRAME_URLS.allLocations} />

      <div>
        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          href="/location/new"
          disableElevation>
          Add new location
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href={EXTERNAL_LINKS.locationsTable}
          disableElevation>
          Edit in Airtable
        </Button>
      </div>
    </div>
  )
}

export default Locations
