import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'

const Artists = props => {
  return (
    <div>
      <h3>All Artists</h3>
      <EmbeddedIframe src={'https://airtable.com/embed/shra4E5FrOJS6fzWO?backgroundColor=red&viewControls=on'} />

      <div>
        <Button
          color="primary"
          variant="contained"
          component="a"
          href="/profile/new"
          target="_blank"
          rel="noopener noreferrer">
          Add new artist
        </Button>
      </div>
    </div>
  )
}

export default Artists
