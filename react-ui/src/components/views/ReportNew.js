import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import useRoles from 'customHooks/useRoles'
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

const ReportNew = () => {
  const { isLoadingRoles } = useRoles()
  const classes = useStyles()

  return (
    <DefaultLayout loading={isLoadingRoles}>
      <Container maxWidth="md">
        <div className={classes.container}>
          <Block>
            <BlockTitle title={`StART Partnership Program Final Report`} />
            <p>
              StreetARToronto Partnership Program 2020 Final Report Deadline: December 31, 2020.
            </p>
            <p>
              Congratulations on your successful Partnership Program project.
              Your feedback is extremely valuable to our program. If you have
              any questions about the Final Report, please direct them to
              streetart@toronto.ca.
            </p>
            <EmbeddedCognitoForm formId={COGNITO_FORMS_IDS.partnershipProgramFinalReport} />
          </Block>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default ReportNew
