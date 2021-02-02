import React from 'react'
import EmbeddedIframe from 'components/common/EmbeddedIframe'

const Submissions = props => {
  return (
    <div>
      <EmbeddedIframe
        src={
          'https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on'
        }
      />
    </div>
  )
}

export default Submissions
