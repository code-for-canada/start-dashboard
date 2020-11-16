import React, { useState, useEffect } from 'react'
import { Select, useGlobalConfig } from '@airtable/blocks/ui'
import { useAuth0Token } from '../utils'
import { DEFAULT_TEMPLATE_PICKER_OPTION } from '../constants'

const TemplatePicker = ({
  selectedTemplate,
  setSelectedTemplate,
  setAlert,
  disabled,
  useGlobalConfigHook = useGlobalConfig,
  useAuth0TokenHook = useAuth0Token,
  useStateHook = useState,
}) => {
  const [templates, setTemplates] = useStateHook([])
  const globalConfig = useGlobalConfigHook()
  const token = useAuth0TokenHook()

  useEffect(() => {
    const getTemplates = async () => {
      const res = await fetch(globalConfig.get('dashboardApiEndpoint'), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const data = await res.json()

      if (res.statusCode !== 200) {
        setAlert(data.error)
      }
      const tmpls = data.templates.Data
      setTemplates(tmpls)
    }

    if (token && !templates.length) {
      getTemplates()
    }
  }, [templates, token])

  let templateOptions = templates.map(t => {
    return { label: t.Name, value: t.ID }
  })
  templateOptions.unshift(DEFAULT_TEMPLATE_PICKER_OPTION)

  return (
    <Select
      disabled={disabled}
      options={templateOptions}
      value={selectedTemplate}
      onChange={newValue => setSelectedTemplate(newValue)}
      width="100%"
    />
  )
}

export default TemplatePicker
