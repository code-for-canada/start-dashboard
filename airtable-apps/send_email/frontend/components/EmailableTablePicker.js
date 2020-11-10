import React, { useEffect, useState } from 'react'
import { Select, useBase } from '@airtable/blocks/ui'
import { isTableEmailable } from './../utils'

const EmailableTablePicker = props => {
  const base = useBase()
  const [ filteredOptions, setFilteredOptions ] = useState([])

  useEffect(() => {
    const loadEmailableOptions = () => {
      const emailableOptions = base.tables.map(table => ({
        value: table.id,
        label: table.name,
        disabled: !isTableEmailable(table)
      }))
      setFilteredOptions(emailableOptions)
    }
    loadEmailableOptions()
  }, [setFilteredOptions, base])

  return (
    <Select
      {...props}
      options={filteredOptions}
    />
  )
}

export default EmailableTablePicker
