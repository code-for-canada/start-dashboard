import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Grid } from '@material-ui/core'

const Charts = props => {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <EmbeddedIframe src={'https://airtable.com/embed/shr7aNlR2QTzsSqjM?backgroundColor=red'} />
      </Grid>

      <Grid item md={6}>
        <EmbeddedIframe src={'https://airtable.com/embed/shrYSQzL3KjngY2xN?backgroundColor=red'} />
      </Grid>

      <Grid item md={6}>
        <EmbeddedIframe src={'https://airtable.com/embed/shrsz1PVXK5MIphFj?backgroundColor=red'} />
      </Grid>

      <Grid item md={6}>
        <EmbeddedIframe src={'https://airtable.com/embed/shrO9gQz4j3rKNvWL?backgroundColor=redd'} />
      </Grid>

      <Grid item md={6}>
        <EmbeddedIframe src={'https://airtable.com/embed/shrDMDeDT8pWNnC1i?backgroundColor=red'} />
      </Grid>

      <Grid item md={6}>
        <EmbeddedIframe src={'https://airtable.com/embed/shrmZGi0nx3NDCsQT?backgroundColor=red'} />
      </Grid>
    </Grid>
  )
}

export default Charts
