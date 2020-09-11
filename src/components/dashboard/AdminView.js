import React from "react";
import { Container } from "react-bootstrap";

import EmbeddedIframe from './EmbeddedIframe'

const AdminDashboard = (user) => {
  return (
    <div className="row">
      <div className="col-12 mt-4">
        <h1 className="mb-4">Admin Dashboard Demo</h1>
      </div>

      <div className="col-md-4">
        <div className="mb-3">
          <h2 className="mb-2">Progress Updates</h2>
          <EmbeddedIframe title="Artwork Progress Updates" src="https://airtable.com/embed/shrxrrqGr1tu5UKt9?backgroundColor=red&viewControls=on" />
        </div>

        <div className="mb-3">
          <h2 className="mb-2">Submit Update</h2>
          <EmbeddedIframe title="Artwork Progress Update Form" src="https://airtable.com/embed/shrvLFrcxroCiCWgr?backgroundColor=red" />
        </div>
      </div>

      <div className="col-md-8">
        <div className="mb-3">
          <h2 className="mb-2">Artwork Status Board</h2>
          <EmbeddedIframe title="Artwork Progress Board" src="https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on" />
        </div>
        <div className="mb-3">
          <h2 className="mb-2">New Submissions</h2>
          <EmbeddedIframe title="New Submissions" src="https://airtable.com/embed/shrbgSefEwH2I8pgM?backgroundColor=red&viewControls=on" />
        </div>
      </div>

      <div className="col-md-12">
        <div className="mb-3">
          <h2 className="mb-2">Artworks</h2>
          <EmbeddedIframe title="Artworks" src="https://airtable.com/embed/shrdDGqIxvtiIjFzZ?backgroundColor=red&viewControls=on" />
        </div>
        <div className="mb-3">
          <h2 className="mb-2">Artists</h2>
          <EmbeddedIframe title="Artists" src="https://airtable.com/embed/shrJegAZi7w7Kj5ue?backgroundColor=red&viewControls=on" />
        </div>
      </div>

    </div>
  )
};

export default AdminDashboard;