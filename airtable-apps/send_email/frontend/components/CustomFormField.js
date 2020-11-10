import React from 'react'
import { FormField } from '@airtable/blocks/ui'

const CustomFormField = props => (
    <>
      <style type="text/css">
      {`
      .custom-form-field label {
        margin-bottom: 6px;
      }
      `}
    </style>
    <FormField {...props} className="custom-form-field" />
  </>
)

export default CustomFormField
