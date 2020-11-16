import React, { useEffect, useState } from 'react'
import { Select, useBase } from '@airtable/blocks/ui'
import { isTableEmailable } from './../utils'

const EmailableTablePicker = ({ useBaseHook = useBase, ...props }) => {
  const base = useBaseHook()
  const [ filteredOptions, setFilteredOptions ] = useState([])

  useEffect(() => {
    const emailableOptions = base.tables.map(table => ({
      value: table.id,
      label: table.name,
      disabled: !isTableEmailable(table)
    }))
    setFilteredOptions(emailableOptions)
  }, [setFilteredOptions, base])

  return (
    <Select
      {...props}
      options={filteredOptions}
    />
  )
}

export default EmailableTablePicker
