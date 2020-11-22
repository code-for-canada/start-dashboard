import React from 'react'
import { Container } from '@material-ui/core'
import EmbeddedIframe from 'components/common/EmbeddedIframe'

const CuratorDashboard = user => {
  return (
    <Container>
      <div className="row">
        <div className="col-12 mt-4">
          <h1 className="mb-4">Curator Dashboard Demo</h1>
        </div>

        <div className="col-12">
          <div className="mb-4">
            <h2 className="mb-3">Published Artworks</h2>
            <EmbeddedIframe
              title="Published Artworks"
              src="https://airtable.com/embed/shrTY5JWaHMkwbm80?backgroundColor=red&viewControls=onn"
            />
          </div>
        </div>

        <div className="col-12">
          <div className="mb-4">
            <h2 className="mb-3">Artists</h2>
            <EmbeddedIframe
              title="Artists"
              src="https://airtable.com/embed/shrJegAZi7w7Kj5ue?backgroundColor=red&viewControls=on"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default CuratorDashboard
