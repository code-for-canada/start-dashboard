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

const ReviewerDashboard = user => {
  const classes = useStyles()
  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className={classes.header}>Advisory Committee Dashboard Demo</h1>
        </Grid>

        <Panel
          title="Submission Status Board"
          editLink="https://airtable.com/tblcX15UBd7NvgZNz/viwEVrFXgIndPwQYw?blocks=hide"
          editText="Edit in Airtable"
          isSmall={false}>
          <EmbeddedIframe
            title="Submission Status Board"
            src="https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on"
          />
        </Panel>

        <Panel
          title="New Submissions"
          editLink="https://airtable.com/tblcX15UBd7NvgZNz/viw4z8P0p5Uzs1aDw?blocks=hide"
          editText="Edit in Airtable"
          isSmall={false}>
          <EmbeddedIframe
            title="New Submissions"
            src="https://airtable.com/embed/shrbgSefEwH2I8pgM?backgroundColor=red&viewControls=on"
          />
        </Panel>
      </Grid>
    </Container>
  )
}

export default ReviewerDashboard
