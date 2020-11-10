import React from 'react'
import { Heading } from '@airtable/blocks/ui'
import SettingsInputField from './SettingsInputField'

const SettingsView = () => (
  <div style={{ padding: '10px' }}>
    <Heading size="small" marginBottom="10px">Settings</Heading>
    <SettingsInputField label="Dashboard API endpoint" configKey="dashboardApiEndpoint" />
    <SettingsInputField label="Auth0 token endpoint" configKey="auth0TokenEndpoint" />
    <SettingsInputField label="Auth0 API identifier" configKey="auth0ApiIdentifier" />
    <SettingsInputField label="Auth0 Client ID" configKey="auth0ClientId" />
    <SettingsInputField label="Auth0 Client Secret" configKey="auth0ClientSecret" />
  </div>
)

export default SettingsView
