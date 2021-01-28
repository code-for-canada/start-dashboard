import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import ApplicationsList from 'components/common/ApplicationsList'
import Panel from 'components/common/Panel'

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(2)
  }
}))

const ReviewerDashboard = props => {
  const classes = useStyles()

  return (
    <div className="reviewer-view">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className={classes.header}>Advisory Committee Dashboard</h1>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Panel
          title="Submissions Assigned to Me"
          editLink="https://streetartto.submittable.com/"
          editText="View in Submittable"
          isSmall={false}>
          <ApplicationsList />
        </Panel>

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
      </Grid>
    </div>
  )
}

export default ReviewerDashboard
