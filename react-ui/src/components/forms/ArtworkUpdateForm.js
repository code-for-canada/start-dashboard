import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2)
  }
}))

const ArtworkUpdateForm = ({ onSubmit, formData, setFormData }) => {
  const classes = useStyles()
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Title"
        value={formData.title || ''}
        onChange={e =>
          setFormData({ ...formData, title: e.currentTarget.value })
        }
        fullWidth={true}
        variant="outlined"
        margin="dense"
      />

      <TextField
        label="Description"
        value={formData.description || ''}
        onChange={e =>
          setFormData({ ...formData, description: e.currentTarget.value })
        }
        fullWidth={true}
        variant="outlined"
        margin="dense"
      />

      <TextField
        label="Year"
        value={formData.year || ''}
        onChange={e =>
          setFormData({ ...formData, year: e.currentTarget.value })
        }
        type="number"
        fullWidth={true}
        variant="outlined"
        margin="dense"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}>
        Save
      </Button>
    </form>
  )
}

ArtworkUpdateForm.propTypes = {
  onSubmit: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default ArtworkUpdateForm
