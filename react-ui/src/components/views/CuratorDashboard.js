import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import Panel from 'components/common/Panel'

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(2)
  }
}))


const CuratorDashboard = user => {
  const classes = useStyles()
  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className={classes.header}>Curator Dashboard Demo</h1>
        </Grid>

        <Panel
          title='Published Artworks'
          editLink='https://airtable.com/tbl5ApSEOzPpe4fwp/viwozx55EaH51F1Su?blocks=hide'
          editText='Edit in Airtable'
          isSmall={false}
        >
          <EmbeddedIframe
            title='Published Artworks'
            src='https://airtable.com/embed/shrTY5JWaHMkwbm80?backgroundColor=red&viewControls=on'
          />
        </Panel>

        <Panel
          title='Artists'
          editLink='https://airtable.com/tblj8vuEdvVTxXr98/viwaEsFNyGcxbtFWi?blocks=hide'
          editText='Edit in Airtable'
          isSmall={false}
        >
          <EmbeddedIframe
            title="Artists"
            src="https://airtable.com/embed/shrJegAZi7w7Kj5ue?backgroundColor=red&viewControls=on"
          />
        </Panel>
      </Grid>
    </Container>
  )
}

export default CuratorDashboard
