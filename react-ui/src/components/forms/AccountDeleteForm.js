import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2)
  }
}))

const AccountDeleteForm = ({ onSubmit, email, setAlert }) => {
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
        This will delete your account completely, including your artist profile
        (if you have one).
      </p>
      <p>
        If you have artworks on the public map, they will only show your current
        preferred public name.
      </p>
      <p>This is a permanent action that cannot be undone.</p>
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
        className={classes.button}>
        Delete my account
      </Button>
    </form>
  )
}

AccountDeleteForm.propTypes = {
  onSubmit: PropTypes.func,
  setAlert: PropTypes.func,
  email: PropTypes.string
}

export default AccountDeleteForm
