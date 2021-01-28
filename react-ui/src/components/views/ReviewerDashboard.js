import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Panel from 'components/common/Panel'
import ApplicationsList from 'components/panels/ApplicationsList'
import SubmissionsByStatus from 'components/panels/SubmissionsByStatus'
import usePanelState from 'customHooks/usePanelState'

export const PANELS_DATA = [
  {
    id: 'reviewer-applications',
    title: 'Submissions Assigned to Me',
    isVisible: false,
    isSmall: false,
    content: ApplicationsList
  },
  {
    id: 'reviewer-submissions',
    title: 'Submissions by Status',
    isVisible: false,
    isSmall: false,
    content: SubmissionsByStatus
  }
]

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(2)
  }
}))

const ReviewerDashboard = props => {
  const classes = useStyles()
  const { panels, toggleVisibility, toggleSize } = usePanelState(PANELS_DATA)

  const addConfigToDefaultPanels = () => {
    return PANELS_DATA.map(panel => {
      const panelConfig = panels.find(config => config.id === panel.id)
      return {
        ...panel,
        isVisible: panelConfig ? panelConfig.isVisible : panel.isVisible,
        isSmall: panelConfig ? panelConfig.isSmall : panel.isSmall
      }
    })
  }

  const panelsWithConfig = addConfigToDefaultPanels()

  return (
    <div className="reviewer-view">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className={classes.header}>Advisory Committee Dashboard</h1>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {panelsWithConfig.map((panel, index) => {
          const Content = panel.content
          return (
            <Panel
              {...panel}
              key={panel.id}
              index={index}
              toggleVisibility={toggleVisibility}
              toggleSize={toggleSize}>
              <Content />
            </Panel>
          )
        })}
      </Grid>
    </div>
  )
}

export default ReviewerDashboard
