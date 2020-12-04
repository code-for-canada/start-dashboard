import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'

const Locations = props => {
  return (
    <div>
      <EmbeddedIframe src={'https://airtable.com/embed/shrq9Y4H4zVkBhjgx?backgroundColor=red'} />

      <h3>All locations</h3>
      <EmbeddedIframe src={'https://airtable.com/embed/shrKy239MuejuvGhM?backgroundColor=red&viewControls=on'} />

      <div>
        <Button
          color="primary"
          variant="contained"
          component="a"
          href="/location/new">
          Add new location
        </Button>
      </div>
    </div>
  )
}

export default Locations
