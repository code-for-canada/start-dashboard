import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  }
}))

const Artworks = props => {
  const classes = useStyles()
  return (
    <div>
      <h3>Artworks by Status</h3>
      <EmbeddedIframe src={'https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on'} />

      <h3>All Artworks</h3>
      <EmbeddedIframe src={'https://airtable.com/embed/shrdDGqIxvtiIjFzZ?backgroundColor=red&viewControls=on'} />

      <div>
        <Button
          disabled
          className={classes.button}
          color="primary"
          variant="contained"
          component="a"
          href="/profile/new"
          target="_blank"
          rel="noopener noreferrer">
          Add new artwork
        </Button>

        <Button
          disabled
          color="primary"
          variant="contained"
          component="a"
          href="/profile/new"
          target="_blank"
          rel="noopener noreferrer">
          Update artwork status
        </Button>
      </div>
    </div>
  )
}

export default Artworks
