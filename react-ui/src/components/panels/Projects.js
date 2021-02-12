import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { EXTERNAL_LINKS, IFRAME_URLS } from 'utils/constants'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  }
}))

const Projects = props => {
  const classes = useStyles()
  return (
    <div>
      <h3>Projects by Leader</h3>
      <EmbeddedIframe src={IFRAME_URLS.projectsByLeader} />

      <h3>Gantt Chart</h3>
      <EmbeddedIframe src={IFRAME_URLS.projectGanttChart} />

      <div>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          component="a"
          href={EXTERNAL_LINKS.projectsTable}
          target="_blank"
          rel="noopener noreferrer"
          disableElevation>
          Edit in Airtable
        </Button>
      </div>
    </div>
  )
}

export default Projects
