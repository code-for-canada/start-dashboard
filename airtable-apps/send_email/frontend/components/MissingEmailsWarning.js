import React, { useState, useEffect } from 'react'
import { Text, Button } from '@airtable/blocks/ui'

const MissingEmailsWarning = ({ records = [] }) => {
  return (
    <div>
      <p>The following records are missing an email address:</p>
      <ul>
        {records.map(r =>
          <li key={r.record_url}>
            <a href={r.record_url} target="_blank">
              {r.primary_key || r.record_url}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

export default MissingEmailsWarning
