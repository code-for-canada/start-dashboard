import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2)
  }
}))

const AccountUpdateForm = ({ onSubmit, formData, setFormData }) => {
  const classes = useStyles()
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="First name"
        value={formData.firstName || ''}
        onChange={e =>
          setFormData({ ...formData, firstName: e.currentTarget.value })
        }
        fullWidth={true}
        variant="outlined"
        margin="dense"
      />

      <TextField
        label="Last name"
        value={formData.lastName || ''}
        onChange={e =>
          setFormData({ ...formData, lastName: e.currentTarget.value })
        }
        fullWidth={true}
        variant="outlined"
        margin="dense"
      />

      <TextField
        label="Email address"
        value={formData.email || ''}
        onChange={e =>
          setFormData({ ...formData, email: e.currentTarget.value })
        }
        fullWidth={true}
        variant="outlined"
        margin="dense"
        helperText="If you change your email, you must verify the new email address before you can access your dashboard again."
        required
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

AccountUpdateForm.propTypes = {
  onSubmit: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func
}

export default AccountUpdateForm
