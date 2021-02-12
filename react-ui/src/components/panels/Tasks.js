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

const Tasks = props => {
  const classes = useStyles()
  return (
    <div>
      <h3>Progress Board</h3>
      <EmbeddedIframe src={IFRAME_URLS.tasksKanban} />

      <h3>Calendar</h3>
      <EmbeddedIframe src={IFRAME_URLS.tasksCalendar} />
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

export default Tasks
