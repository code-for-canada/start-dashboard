import React, { useState, useEffect } from 'react'
import { Select, useGlobalConfig } from '@airtable/blocks/ui'

const TemplatePicker = ({ token, selectedTemplate, setSelectedTemplate, setAlert, firstOption }) => {
  const [templates, setTemplates] = useState([])
  const globalConfig = useGlobalConfig()

  useEffect(() => {
    const getTemplates = async () => {
      console.log("getting tmplates!!")
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
  templateOptions.unshift(firstOption)

  return (
    <Select
      options={templateOptions}
      value={selectedTemplate}
      onChange={newValue => setSelectedTemplate(newValue)}
      width="100%"
    />
  )
}

export default TemplatePicker
