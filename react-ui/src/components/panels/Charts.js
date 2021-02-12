import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Grid, Button } from '@material-ui/core'
import { EXTERNAL_LINKS, IFRAME_URLS } from 'utils/constants'
import useUtilityClasses from 'customHooks/useUtilityClasses'

const Charts = props => {
  const utilClasses = useUtilityClasses()
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <EmbeddedIframe src={IFRAME_URLS.artworksByProgramChat} />
        </Grid>

        <Grid item md={6}>
          <EmbeddedIframe src={IFRAME_URLS.artworksByYearChart} />
        </Grid>

        <Grid item md={6}>
          <EmbeddedIframe src={IFRAME_URLS.artworksByWardChart} />
        </Grid>

        <Grid item md={6}>
          <EmbeddedIframe src={IFRAME_URLS.submissionsByProgramChart} />
        </Grid>

        <Grid item md={6}>
          <EmbeddedIframe src={IFRAME_URLS.submissionsByLabelChart} />
        </Grid>

        <Grid item md={6}>
          <EmbeddedIframe src={IFRAME_URLS.artistsByPronounChart} />
        </Grid>
      </Grid>
      <div>
        <Button
          color="primary"
          variant="contained"
          className={utilClasses.horizListSpacing}
          component="a"
          href={EXTERNAL_LINKS.chartsFullScreen}
          target="_blank"
          rel="noopener noreferrer"
          disableElevation>
          Edit in Airtable
        </Button>
      </div>
    </div>
  )
}

export default Charts
