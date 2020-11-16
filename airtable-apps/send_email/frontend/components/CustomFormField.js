import React from 'react'
import { FormField, loadCSSFromString } from '@airtable/blocks/ui'

loadCSSFromString(`
  .custom-form-field label {
    margin-bottom: 6px;
  }
`)

const CustomFormField = props => (
  <FormField {...props} className="custom-form-field" />
)

export default CustomFormField
