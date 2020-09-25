import React from "react";
import { Container } from "react-bootstrap";

import EmbeddedIframe from './EmbeddedIframe'

const StaffDashboard = ({user}) => {
  return (
    <Container>
      <div className="row">
        <div className="col-12 mt-4">
          <h1 className="mb-4">StART Staff Dashboard Demo</h1>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="mb-3">Progress Updates</h2>
          <EmbeddedIframe title="Artwork Progress Updates" src="https://airtable.com/embed/shrxrrqGr1tu5UKt9?backgroundColor=red&viewControls=on" />
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">Submit Update</h2>
          <EmbeddedIframe title="Artwork Progress Update Form" src="https://airtable.com/embed/shr087J79r2jG6rE2?backgroundColor=red" />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-3">Artwork Status Board</h2>
          <EmbeddedIframe title="Artwork Progress Board" src="https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on" />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-3">Submissions</h2>
          <EmbeddedIframe title="Submissions" src="https://airtable.com/embed/shrxT5GoyFQC61w5O?backgroundColor=red&viewControls=on" />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-3">Artworks</h2>
          <EmbeddedIframe title="Artworks" src="https://airtable.com/embed/shrdDGqIxvtiIjFzZ?backgroundColor=red&viewControls=on" />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-3">Artists</h2>
          <EmbeddedIframe title="Artists" src="https://airtable.com/embed/shrJegAZi7w7Kj5ue?backgroundColor=red&viewControls=on" />
        </div>
      </div>
    </Container>
  )
};

export default StaffDashboard;