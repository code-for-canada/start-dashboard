import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Panel from 'components/common/Panel'
import ConfigDrawer from 'components/common/ConfigDrawer'
import PanelControlBlock from 'components/common/PanelControlBlock'
import ShortcutMenu from 'components/common/ShortcutMenu'
import usePanelState from 'customHooks/usePanelState'
import { DASHBOARD_SHORTCUTS, USER_GUIDE_DOC } from 'utils/constants'
import Submissions from 'components/panels/Submissions'
import Reports from 'components/panels/Reports'
import Artists from 'components/panels/Artists'
import Artworks from 'components/panels/Artworks'
import Charts from 'components/panels/Charts'
import Locations from 'components/panels/Locations'
import Projects from 'components/panels/Projects'
import Tasks from 'components/panels/Tasks'

export const PANELS_DATA = [
  {
    id: 'tasks',
    title: 'Tasks',
    isVisible: false,
    isSmall: false,
    content: Tasks
  },
  {
    id: 'projects',
    title: 'Projects',
    isVisible: false,
    isSmall: false,
    content: Projects
  },
  {
    id: 'submissions',
    title: 'Submissions',
    isVisible: false,
    isSmall: false,
    content: Submissions,
    guides: [
      {
        title: 'How to set up an application form on Submittable',
        link: `${USER_GUIDE_DOC}#heading=h.wsulqj6ofxsi`
      }
    ]
  },
  {
    id: 'artworks',
    title: 'Artworks',
    isVisible: false,
    isSmall: false,
    content: Artworks,
    guides: [
      {
        title: 'How to add an artwork to the database',
        link: `${USER_GUIDE_DOC}#heading=h.sr3v8nph29mu`
      },
      {
        title: 'How to update an artwork’s information',
        link: `${USER_GUIDE_DOC}#heading=h.vrelgewywb8c`
      },
      {
        title: 'How to review and approve changes to an artwork',
        link: `${USER_GUIDE_DOC}#heading=h.fqknk88c6ih5`
      },
      {
        title: 'How to search and filter artworks',
        link: `${USER_GUIDE_DOC}#heading=h.2pupcjt5sfnf`
      }
    ]
  },
  {
    id: 'artists',
    title: 'Artists',
    isVisible: false,
    isSmall: false,
    content: Artists,
    guides: [
      {
        title: 'How to add an artist to the database',
        link: `${USER_GUIDE_DOC}#heading=h.4didquwn4hfy`
      },
      {
        title: 'How to update an artist’s profile',
        link: `${USER_GUIDE_DOC}#heading=h.jtbns3bziflx`
      },
      {
        title: 'How to search and filter artists',
        link: `${USER_GUIDE_DOC}#heading=h.jushirtzch5f`
      }
    ]
  },
  {
    id: 'reports',
    title: 'Reports',
    isVisible: false,
    isSmall: false,
    content: Reports,
    guides: [
      {
        title: 'How to create a new report form',
        link: `${USER_GUIDE_DOC}#heading=h.17iz5l7ssxit`
      },
      {
        title: 'How to invite artists to complete a report',
        link: `${USER_GUIDE_DOC}#heading=h.a6wg42wd3guu`
      },
      {
        title: 'How to view completed reports',
        link: `${USER_GUIDE_DOC}#heading=h.xyofh7kh29`
      }
    ]
  },
  {
    id: 'charts',
    title: 'Charts',
    isVisible: false,
    isSmall: false,
    content: Charts,
    guides: [
      {
        title: 'How to create a chart',
        link: `${USER_GUIDE_DOC}#heading=h.p2isfqs3n0ie`
      },
      {
        title: 'How to update a chart',
        link: `${USER_GUIDE_DOC}#heading=h.txw6yatvymev`
      }
    ]
  },
  {
    id: 'locations',
    title: 'Locations',
    isVisible: false,
    isSmall: false,
    content: Locations,
    guides: [
      {
        title: 'How to add a location to the database',
        link: `${USER_GUIDE_DOC}#heading=h.d21ujobpprag`
      }
    ]
  }
]

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

  const panelsWithConfig = addConfigToDefaultPanels()
  const classes = useStyles()

  return (
    <div className="staff-view">
      <Grid
        container
        spacing={2}
        justify="space-between"
        className={classes.header}>
        <Grid item>
          <h1>StART Staff Dashboard</h1>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <ShortcutMenu links={DASHBOARD_SHORTCUTS.staff} />
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

export default StaffDashboard
