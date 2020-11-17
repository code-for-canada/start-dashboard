import React from 'react'
import SendInfoBox from './SendInfoBox'

export default {
  component: SendInfoBox,
  title: 'Airtable Apps/SendInfoBox'
}

const Template = args => <SendInfoBox {...args} />

export const Default = Template.bind({})
Default.args = {
  tableData: [
    {email: 'one@example.com', first_name: 'Jane', program_name: 'Program A'},
    {email: 'two@example.com', first_name: 'Maria', program_name: 'Program B'},
    {email: 'three@example.com', first_name: 'John', program_name: 'Program A'},
  ],
  templateVars: [
    {name: 'email', default: '', isColMissing: false},
    {name: 'first_name', default: 'applicant', isColMissing: false},
    {name: 'program_name', default: 'StART', isColMissing: false},
  ],
  templateEditLink: 'https://app.mailjet.com/template/1743481/build',
  templatePreviewLink: 'https://app.mailjet.com/template/1743481/version-history',
}

export const ViewMissingColumn = Template.bind({})
ViewMissingColumn.args = {
  ...Default.args,
  templateVars: [
    Default.args.templateVars[0],
    Default.args.templateVars[1],
    Object.assign({}, Default.args.templateVars[2], {isColMissing: true}),
  ]
}

export const RowsMissingEmail = Template.bind({})
RowsMissingEmail.args = {
  ...Default.args,
  tableData: [
    Default.args.tableData[0],
    Default.args.tableData[1],
    Object.assign({}, Default.args.tableData[2], {email: null}),
  ]
}

export const NoTemplateVariables = Template.bind({})
NoTemplateVariables.args = {
  ...Default.args,
  templateVars: []
}
