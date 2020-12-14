import React from 'react'
import PropTypes from 'prop-types'

import DefaultLayout from 'components/layouts/DefaultLayout'
import EmbeddedIframe from 'components/common/EmbeddedIframe'
import Unauthorized from 'components/views/Unauthorized'
import useRoles from 'customHooks/useRoles'

const ArtworkNew = props => {
  const { isLoadingRoles, isStaff } = useRoles()

  if (!isLoadingRoles && !isStaff) {
    return <Unauthorized />
  }

  return (
    <DefaultLayout loading={isLoadingRoles}>
      <EmbeddedIframe
        src="https://airtable.com/embed/shrMvrXih5f3TAIbN?backgroundColor=red"
        title="Add a new artwork"
        alwaysEnableScroll={true}
        height={'100%'}
      />
    </DefaultLayout>
  )
}

ArtworkNew.propTypes = {
  user: PropTypes.object,
  isStaff: PropTypes.bool
}

export default ArtworkNew
