import React from 'react'
import { Container, Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'
import { Block, BlockTitle } from 'components/common/Block'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2)
  }
}))

const ProfileSaved = () => {
  const classes = useStyles()
  return (
    <DefaultLayout>
      <Container maxWidth="xl">
        <Grid container justify="center">
          <Grid item md={6}>
            <Block>
              <BlockTitle title="Your profile has been saved!" />
              <p>
                Please make sure to keep your profile up to date. This is how we
                contact you about your current projects, ongoing applications,
                or future opportunities we think you would be interested in.
              </p>
              <Button
                component={Link}
                to={'/dashboard'}
                variant="contained"
                color="primary"
                className={classes.button}>
                Back to my dashboard
              </Button>
            </Block>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}

export default ProfileSaved
