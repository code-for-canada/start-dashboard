import {
  initializeBlock,
  useBase,
  TablePicker,
  ViewPicker,
  Button,
  Select,
  Label,
  Text,
  Heading,
  session
} from '@airtable/blocks/ui';
import React, { useState, useEffect } from 'react';


function SendTemplateEmail() {
  const firstOption = { label: 'Pick an email template', value: null}
  const [selectedTable, setSelectedTable] = useState(null)
  const [selectedView, setSelectedView] = useState(null)
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(firstOption.value)
  // const [emailableTables, setEmailableTables] = useState([])
  const base = useBase()

  // useEffect(() => {
  //   const emailableTables = base.tables.filter(table => {
  //     const fieldNames = table.fields.map(f => f.name)
  //     return fieldNames.includes('email')
  //   })
  //   setEmailableTables(emailableTables)
  // }, [base])

  useEffect(() => {
    const getTemplates = async () => {
      const res = await fetch('http://localhost:3000/api/email-templates')
      const data = await res.json()
      const tmpls = data.templates.Data
      setTemplates(tmpls)
    }

    if (!templates.length) {
      getTemplates()
    }
  }, [templates])

  const sendEmail = async () => {
    const queryResult = selectedView.selectRecords()
    const fields = selectedTable.fields
    await queryResult.loadDataAsync();
    const records = queryResult.records.map(r => {
      return fields.reduce((obj, field) => {
        obj[field.name] = r.getCellValue(field.name)
        return obj
      }, {})
    })

    const payload = {
      records: records,
      template: selectedTemplate,
      user: session.currentUser
    }

    queryResult.unloadData()

    const res = await fetch('http://localhost:3000/api/email-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (res.status !== 200) {
        return console.log("ERROR", data.error.message)
      }

      console.log('RES', res)
  }


  let templateOptions = templates.map(t => {
    return { label: t.Name, value: t.ID }
  })
  templateOptions.unshift(firstOption)

  return (
    <div style={{ padding: '10px' }}>
      <Heading size="small" marginBottom="10px">Send email from a template</Heading>
      <div style={{ paddingBottom: '10px' }}>
        <Label htmlFor="table-picker">Table</Label>
        <Text
          marginBottom="5px"
          textColor="light"
        >
          Pick the table you want to use for this email. Note: the table must have an "email" column.
        </Text>
        <TablePicker
          table={selectedTable}
          onChange={newTable => setSelectedTable(newTable)}
          width="100%"
          id="table-picker"
        />
      </div>

      {
        selectedTable &&
        <div style={{ paddingBottom: '10px' }}>
          <Label htmlFor="view-picker">View</Label>
          <Text
            marginBottom="5px"
            textColor="light"
          >
            Pick the view that contains the selection of records you want to send the email to.
          </Text>
          <ViewPicker
            table={selectedTable}
            view={selectedView}
            onChange={newView => setSelectedView(newView)}
            width="100%"
            id="view-picker"
          />
        </div>
      }

      {
        selectedView &&
        <div style={{ paddingBottom: '10px' }}>
          <Label htmlFor="template-picker">Email Template</Label>
          <Text
            marginBottom="5px"
            textColor="light"
          >
            Pick the email template from Mailjet to send to your recipients.
          </Text>
          <Select
            options={templateOptions}
            value={selectedTemplate}
            onChange={newValue => setSelectedTemplate(newValue)}
            width="100%"
            id="template-picker"
          />
        </div>
      }

      {
        selectedView && selectedTemplate &&
        <Button onClick={sendEmail} variant="danger" icon="envelope">Send the email</Button>
      }
    </div>
  )
}

initializeBlock(() => <SendTemplateEmail />);
