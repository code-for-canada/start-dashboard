import React, { useState, useEffect } from 'react';
import {
  initializeBlock,
  useBase,
  useGlobalConfig,
  useSettingsButton,
  TablePicker,
  ViewPicker,
  Button,
  Select,
  Label,
  Text,
  Heading,
  Box
} from '@airtable/blocks/ui';
import { cursor, session } from '@airtable/blocks';

import Alert from './components/Alert'
import SettingsView from './components/SettingsView'
import TemplatePicker from './components/TemplatePicker'
import MissingEmailsWarning from './components/MissingEmailsWarning'
import { useAuth0Token, isTableEmailable, sendEmail } from './utils'

import {
  UNEMAILABLE_TABLE_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  EMAIL_SUCCESS_MESSAGE,
  EMAIL_FAILED_MESSAGE,
  DEFAULT_TEMPLATE_PICKER_OPTION
} from './constants'

function SendTemplateEmail() {
  const base = useBase()
  const globalConfig = useGlobalConfig();
  const token = useAuth0Token()

  const [selectedTable, setSelectedTable] = useState(base.getTableByIdIfExists(cursor.activeTableId))
  const [selectedView, setSelectedView] = useState(null)
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE_PICKER_OPTION.value)
  const [alert, setAlert] = useState(null)
  const [isShowingSettings, setIsShowingSettings] = useState(!Boolean(globalConfig.get('auth0ClientSecret')));

  useSettingsButton(function() {
    setIsShowingSettings(!isShowingSettings);
  });

  useEffect(() => {
    if (selectedTable) {
      if (!isTableEmailable(selectedTable)) {
        setSelectedTable(null)
        setAlert(UNEMAILABLE_TABLE_MESSAGE)
      } else {
        setAlert(null)
      }
    }
  }, [selectedTable])

  const handleSendEmail = async () => {
    if (!token) {
      return setAlert(UNAUTHORIZED_MESSAGE)
    }

    const queryResult = selectedView.selectRecords()
    await queryResult.loadDataAsync();
    const fields = selectedTable.fields
    // include all the fields from the table so they can be sent
    // to Mailjet as template variables
    const records = queryResult.records.map(r => {
      return fields.reduce((obj, field) => {
        obj[field.name] = r.getCellValueAsString(field.name)
        return obj
      }, { record_url: r.url, primary_key: r.name })
    })

    queryResult.unloadData()

    const payload = {
      records: records,
      template: selectedTemplate,
      user: session.currentUser // not using this yet on back end
    }

    const endpoint = globalConfig.get('dashboardApiEndpoint')
    const { res, data } = await sendEmail(endpoint, token, payload)

    if (res.status === 400) {
      const message = <MissingEmailsWarning records={data.records} />
      return setAlert(message)
    }

    setAlert(EMAIL_SUCCESS_MESSAGE)
    setSelectedTemplate(DEFAULT_TEMPLATE_PICKER_OPTION.value)
    setSelectedTable(base.getTableByIdIfExists(cursor.activeTableId))
    setSelectedView(null)
  }

  if (isShowingSettings) {
    return (
      <SettingsView />
    )
  }

  return (
    <Box padding={3}>
      <Heading size="small" marginBottom={3}>Send email from a template</Heading>
      <Alert alert={alert} onClose={() => setAlert(null)} />

      <Box marginBottom={3}>
        <Label htmlFor="table-picker">Table</Label>
        <Text
          marginBottom={2}
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
      </Box>

      <Box marginBottom={3}>
        <Label htmlFor="view-picker">View</Label>
        <Text
          marginBottom={2}
          textColor="light"
        >
          Pick the view that contains the selection of records you want to send the email to.
        </Text>
        <ViewPicker
          disabled={!selectedTable}
          table={selectedTable}
          view={selectedView}
          onChange={newView => setSelectedView(newView)}
          width="100%"
          id="view-picker"
        />
      </Box>

      <Box marginBottom={3}>
        <Label htmlFor="template-picker">Email Template</Label>
        <Text
          marginBottom={2}
          textColor="light"
        >
          Pick the email template from Mailjet to send to your recipients.
        </Text>
        <TemplatePicker
          disabled={!selectedView}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          setAlert={setAlert}
        />
      </Box>

      <Button
        disabled={!(selectedView && selectedTemplate)}
        onClick={handleSendEmail}
        variant="danger"
        icon="envelope"
      >
        Send it!
      </Button>
    </Box>
  )
}

initializeBlock(() => <SendTemplateEmail />);
