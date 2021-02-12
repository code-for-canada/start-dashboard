import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import { Block, BlockTitle } from 'components/common/Block'
import { COGNITO_FORMS_IDS } from 'utils/constants'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const Report = () => {
  const classes = useStyles()

  return (
    <DefaultLayout>
      <Container maxWidth="md">
        <div className={classes.container}>
          <Block>
            <BlockTitle title="StART Dashboard Feedback" />
            <EmbeddedCognitoForm formId={COGNITO_FORMS_IDS.feedbackForm} />
          </Block>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Report
