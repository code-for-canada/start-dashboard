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
  Icon,
  FormField,
  Input
} from '@airtable/blocks/ui';
import { cursor, session } from '@airtable/blocks';

const UNEMAILABLE_TABLE_MESSAGE = 'The table must have an "email" column.'
const UNAUTHORIZED_MESSAGE = 'This app is not authorized to send emails.'
const EMAIL_SUCCESS_MESSAGE = "Your email has been sent!"
const EMAIL_FAILED_MESSAGE = "There was an error sending your email."

function SendTemplateEmail() {
  const firstOption = { label: 'Pick an email template', value: null}
  const base = useBase()
  const globalConfig = useGlobalConfig();

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

  const isTableEmailable = table => {
    const fieldNames = table.fields.map(f => f.name)
    return fieldNames.includes('email')
  }

  useEffect(() => {
    const getToken = async () => {
      const authParams = {
        "audience": globalConfig.get('auth0ApiIdentifier'),
        "grant_type": "client_credentials",
        "client_id": globalConfig.get('auth0ClientId'),
        "client_secret": globalConfig.get('auth0ClientSecret')
      }

      const tokenResult = await fetch(globalConfig.get('auth0TokenEndpoint'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authParams)
      })

      const data = await tokenResult.json()

      const token = data.access_token

      setToken(token)
    }

    if (!token) {
      getToken()
    }
  }, [token])

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


  let templateOptions = templates.map(t => {
    return { label: t.Name, value: t.ID }
  })
  templateOptions.unshift(firstOption)

  if (isShowingSettings) {
    return (
      <div style={{ padding: '10px' }}>
        <Heading size="small" marginBottom="10px">Settings</Heading>
        <FormField label="Dashboard API endpoint">
          <Input value={globalConfig.get('dashboardApiEndpoint')} onChange={e => globalConfig.setAsync('dashboardApiEndpoint', e.target.value)} />
        </FormField>
        <FormField label="Auth0 token endpoint">
          <Input value={globalConfig.get('auth0TokenEndpoint')} onChange={e => globalConfig.setAsync('auth0TokenEndpoint', e.target.value)} />
        </FormField>
        <FormField label="Auth0 API identifier">
          <Input value={globalConfig.get('auth0ApiIdentifier')} onChange={e => globalConfig.setAsync('auth0ApiIdentifier', e.target.value)} />
        </FormField>
        <FormField label="Auth0 Client ID">
          <Input value={globalConfig.get('auth0ClientId')} onChange={e => globalConfig.setAsync('auth0ClientId', e.target.value)} />
        </FormField>
        <FormField label="Auth0 Client Secret">
          <Input value={globalConfig.get('auth0ClientSecret')} onChange={e => globalConfig.setAsync('auth0ClientSecret', e.target.value)} />
        </FormField>
      </div>
    )
  }

  return (
    <div style={{ padding: '10px' }}>
      <Heading size="small" marginBottom="10px">Send email from a template</Heading>
      {
        alert &&
        <div style={{
          padding: '5px 10px',
          background: '#def5fe',
          borderRadius: '3px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <Text>{ alert }</Text>
          <Button onClick={() => setAlert(null)}
            variant="secondary"
            size="small"
            icon="x"
          >
          </Button>
        </div>
      }
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
        <Button onClick={sendEmail} variant="danger" icon="envelope" marginTop="5px">Send it!</Button>
      }
    </div>
  )
}

initializeBlock(() => <SendTemplateEmail />);
