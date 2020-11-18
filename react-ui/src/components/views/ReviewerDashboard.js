import React from 'react'
import { Container } from 'react-bootstrap'
import EmbeddedIframe from 'components/common/EmbeddedIframe'

const ReviewerDashboard = user => {
  return (
    <Container>
      <div className="row">
        <div className="col-12 mt-4">
          <h1 className="mb-4">Advisory Committee Dashboard Demo</h1>
        </div>

        <div className="col-12">
          <div className="mb-4">
            <h2 className="mb-3">Submission Status Board</h2>
            <EmbeddedIframe
              title="Submission Status Board"
              src="https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-4">
            <h2 className="mb-3">New Submissions</h2>
            <EmbeddedIframe
              title="New Submissions"
              src="https://airtable.com/embed/shrbgSefEwH2I8pgM?backgroundColor=red&viewControls=on"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ReviewerDashboard
