import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Container, Grid } from '@material-ui/core'

import EmbeddedIframe from '../dashboard/EmbeddedIframe'
import Panel from '../dashboard/Panel'

const InvitationForm = (props) => {
  const [error, setError] = useState(null)

  return (
    <Container>
      <Panel
        title="Create invitation"
        isSmall={true}
        editLink="https://airtable.com/tbl3SlJkrOz7p7PzK/viwgp4FFxLGqINg7g?blocks=bipuNJgxjejbUvhEo"
      >
        <EmbeddedIframe
          title={'Add a Dashboard member'}
          src="https://airtable.com/embed/shrlGZeRbwCpcASR3?backgroundColor=red"
        />
      </Panel>

      <Panel
        title="Send invitation"
        isSmall={true}
        editLink="https://airtable.com/tbl3SlJkrOz7p7PzK/viwgp4FFxLGqINg7g?blocks=bipuNJgxjejbUvhEo"
      >
        <EmbeddedIframe
          title={'Send invitation'}
          src="https://airtable.com/embed/shrgrlghADr53dFrF?backgroundColor=red&viewControls=on"
        />
      </Panel>
    </Container>
  )
}

InvitationForm.propTypes = {

}

InvitationForm.defaultProps = {

}

export default InvitationForm
