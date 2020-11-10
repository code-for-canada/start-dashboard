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
} from '@airtable/blocks/ui';
import { cursor, session } from '@airtable/blocks';

import Alert from './components/Alert'
import SettingsView from './components/SettingsView'
import TemplatePicker from './components/TemplatePicker'
import { getAuth0Token, isTableEmailable } from './utils'

const UNEMAILABLE_TABLE_MESSAGE = 'The table must have an "email" column.'
const UNAUTHORIZED_MESSAGE = 'This app is not authorized to send emails.'
const EMAIL_SUCCESS_MESSAGE = "Your email has been sent!"
const EMAIL_FAILED_MESSAGE = "There was an error sending your email."

function SendTemplateEmail() {
  const base = useBase()
  const globalConfig = useGlobalConfig();
  const firstOption = { label: 'Pick an email template', value: null}

  const [selectedTable, setSelectedTable] = useState(base.getTableByIdIfExists(cursor.activeTableId))
  const [selectedView, setSelectedView] = useState(null)
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(firstOption.value)
  const [alert, setAlert] = useState(null)
  const [token, setToken] = useState(null)
  const [isShowingSettings, setIsShowingSettings] = useState(!Boolean(globalConfig.get('auth0ClientSecret')));

  useSettingsButton(function() {
    setIsShowingSettings(!isShowingSettings);
  });

  useEffect(() => {
    const getToken = async () => {
      const auth0token = await getAuth0Token(
        globalConfig.get('auth0ApiIdentifier'),
        globalConfig.get('auth0ClientId'),
        globalConfig.get('auth0ClientSecret'),
        globalConfig.get('auth0TokenEndpoint')
      )

      setToken(auth0token)
    }
    if (!token) {
      getToken()
    }
  }, [token, globalConfig])

  useEffect(() => {
    if (selectedTable) {
      if (!isTableEmailable(selectedTable)) {
        setAlert(UNEMAILABLE_TABLE_MESSAGE)
      } else {
        setAlert(null)
      }
    }
  }, [selectedTable])

  const sendEmail = async () => {
    if (!token) {
      return setAlert(UNAUTHORIZED_MESSAGE)
    }

    if (!isTableEmailable(selectedTable)) {
      return setAlert(UNEMAILABLE_TABLE_MESSAGE)
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
      }, {})
    })

    const payload = {
      records: records,
      template: selectedTemplate,
      user: session.currentUser // not using this yet on back end
    }

    queryResult.unloadData()

    const res = await fetch(globalConfig.get('dashboardApiEndpoint'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (res.status === 200) {
        setAlert(EMAIL_SUCCESS_MESSAGE)
        setSelectedTemplate(firstOption.value)
        setSelectedTable(base.getTableByIdIfExists(cursor.activeTableId))
        setSelectedView(null)
      } else {
        console.log(data.error)
        setAlert(EMAIL_FAILED_MESSAGE)
      }
  }

  if (isShowingSettings) {
    return (
      <SettingsView />
    )
  }

  return (
    <div style={{ padding: '10px' }}>
      <Heading size="small" marginBottom="10px">Send email from a template</Heading>
      <Alert alert={alert} onClose={() => setAlert(null)} />
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
          <TemplatePicker
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            token={token}
            setAlert={setAlert}
            firstOption={firstOption}
          />
        </div>
      }

      {
        selectedView && selectedTemplate &&
        <Button onClick={sendEmail} variant="danger" icon="envelope" marginTop="5px">Send it!</Button>
      }
    </div>
  )
}

initializeBlock(() => <SendTemplateEmail />);
