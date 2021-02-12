import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2)
  }
}))

const AccountDeleteForm = ({ onSubmit, email, setAlert, isArtist }) => {
  const [validationEmail, setValidationEmail] = useState('')
  const [error, setError] = useState('')
  const classes = useStyles()

  const validateForm = e => {
    e.preventDefault()
    if (validationEmail === email) {
      onSubmit()
    } else {
      setError(
        'Enter the email address for this account to confirm that you want to delete it.'
      )
    }
  }

  return (
    <form onSubmit={validateForm}>
      <p>
        This will delete your StART Dashboard account. This is a permanent
        action that cannot be undone.
      </p>
      {isArtist && (
        <p>
          Your StART Artist Profile will be marked as inactive, meaning that you
          will no longer receive emails about StART programs. Your information
          will be used for internal record-keeping and reporting purposes only.
          If you have any artwork published on the StART Map, a StART staff will
          follow up with you shortly about what information you would like to
          remove from the StART Map.
        </p>
      )}
      <TextField
        label="Enter your email address to confirm."
        value={validationEmail}
        onChange={e => setValidationEmail(e.currentTarget.value)}
        fullWidth={true}
        variant="outlined"
        margin="dense"
        required
        error={Boolean(error)}
        helperText={error}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={validationEmail !== email}
        className={classes.button}
        disableElevation>
        Delete my account
      </Button>
    </form>
  )
}

AccountDeleteForm.propTypes = {
  onSubmit: PropTypes.func,
  setAlert: PropTypes.func,
  email: PropTypes.string,
  isArtist: PropTypes.bool
}

export default AccountDeleteForm
