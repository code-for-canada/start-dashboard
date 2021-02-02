import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { EXTERNAL_LINKS, IFRAME_URLS } from 'utils/constants'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  }
}))

const Artworks = props => {
  const classes = useStyles()
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <h3>Flagged for Review</h3>
          <EmbeddedIframe
            src={
              'https://airtable.com/embed/shrD7vjyY21h6ywuI?backgroundColor=red&layout=card&viewControls=on'
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <h3>Progress Updates</h3>
          <EmbeddedIframe
            src={
              'https://airtable.com/embed/shrhywybjaOqycbNz?backgroundColor=red&layout=card&viewControls=on'
            }
          />
        </Grid>
      </Grid>

      <h3>Artworks by Status</h3>
      <EmbeddedIframe src={IFRAME_URLS.artworksByStatus} />

      <h3>All Artworks</h3>
      <EmbeddedIframe src={IFRAME_URLS.allArtworks} />

      <div>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          component="a"
          href="/artwork/new">
          Add new artwork
        </Button>

        <Button
          color="primary"
          variant="contained"
          component="a"
          href={EXTERNAL_LINKS.artworksTable}
          target="_blank"
          rel="noopener noreferrer">
          Edit in Airtable
        </Button>
      </div>
    </div>
  )
}

export default Artworks
