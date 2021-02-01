import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'
import { EXTERNAL_LINKS, IFRAME_URLS } from 'utils/constants'
import useUtilityClasses from 'customHooks/useUtilityClasses'

const Artists = props => {
  const utilClasses = useUtilityClasses()
  return (
    <div>
      <h3>All Artists</h3>
      <EmbeddedIframe
        src={IFRAME_URLS.allArtists}
      />

      <div>
        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          href="/profile/new"
          target="_blank"
          rel="noopener noreferrer">
          Add new artist
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          href={EXTERNAL_LINKS.artistProfileEntries}
          target="_blank"
          rel="noopener noreferrer">
          Edit in Cognito Forms
        </Button>
      </div>
    </div>
  )
}

export default Artists
