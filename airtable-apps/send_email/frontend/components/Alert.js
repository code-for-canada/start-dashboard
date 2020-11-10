import React, { useState, useEffect } from 'react'
import { Text, Button } from '@airtable/blocks/ui'

const Alert = ({ alert, closeAlert }) => {
  if (!alert) return null;

  return (
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
      <Button onClick={ closeAlert }
        variant="secondary"
        size="small"
        icon="x"
      >
      </Button>
    </div>
  )
}

export default Alert
