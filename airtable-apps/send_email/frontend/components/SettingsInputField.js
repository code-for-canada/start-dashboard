import React from 'react'
import { useGlobalConfig, Input, FormField } from '@airtable/blocks/ui'
import PropTypes from 'prop-types'

const SettingsInputField = ({ label, configKey, useGlobalConfigHook = useGlobalConfig }) => {
  const globalConfig = useGlobalConfigHook()

  return (
    <FormField label={label}>
      <Input
        value={globalConfig.get(configKey)}
        onChange={e => globalConfig.setAsync(configKey, e.target.value)}
      />
    </FormField>
  )
}
SettingsInputField.propTypes = {
  label: PropTypes.string.isRequired,
  configKey: PropTypes.string.isRequired,
  useGlobalConfigHook: PropTypes.func,
}

export default SettingsInputField
