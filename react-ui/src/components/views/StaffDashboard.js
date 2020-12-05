import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import EmbeddedIframe from 'components/common/EmbeddedIframe'
import Panel from 'components/common/Panel'
import ConfigDrawer from 'components/common/ConfigDrawer'
import PanelControlBlock from 'components/common/PanelControlBlock'
import usePanelState from 'customHooks/usePanelState'
import { PANELS_DATA } from 'utils/constants'

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(2)
  }
}))

const StaffDashboard = () => {
  const {
    panels,
    toggleVisibility,
    toggleSize,
    moveUp,
    moveDown
  } = usePanelState(PANELS_DATA)

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

  const orderPanels = panelsWithConfig => {
    panels.forEach((config, configIndex) => {
      const panel = panelsWithConfig.find(p => p.id === config.id)
      if (panel) {
        const panelIndex = panelsWithConfig.indexOf(panel)
        panelsWithConfig.splice(panelIndex, 1)
        panelsWithConfig.splice(configIndex, 0, panel)
      }
    })

    return panelsWithConfig
  }

  const panelsWithConfig = addConfigToDefaultPanels()
  const orderedPanels = orderPanels(panelsWithConfig)
  const classes = useStyles()

  return (
    <Container maxWidth={false}>
      <Grid
        container
        spacing={2}
        justify="space-between"
        className={classes.header}>
        <Grid item>
          <h1>StART Staff Dashboard</h1>
        </Grid>
        <Grid item>
          <ConfigDrawer>
            <PanelControlBlock
              panels={panels}
              moveUp={moveUp}
              moveDown={moveDown}
              toggleVisibility={toggleVisibility}
            />
          </ConfigDrawer>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {orderedPanels.map((panel, index) => (
          <Panel
            {...panel}
            key={panel.id}
            index={index}
            toggleVisibility={toggleVisibility}
            toggleSize={toggleSize}>
            <EmbeddedIframe title={panel.id} src={panel.frameSrc} />
          </Panel>
        ))}
      </Grid>
    </Container>
  )
}

export default StaffDashboard
