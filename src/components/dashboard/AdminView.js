import React from "react";
import EmbeddedIframe from './EmbeddedIframe'

const AdminDashboard = (user) => {
  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="mb-3">
        <h2>Artwork Status Updates</h2>
        <EmbeddedIframe title="Artwork Status Updates" src="https://airtable.com/embed/shrxrrqGr1tu5UKt9?backgroundColor=red&viewControls=on" />
      </div>

      <div className="mb-3">
        <h2>Artwork Progress Board</h2>
        <EmbeddedIframe title="Artwork Progress Board" src="https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on" />
      </div>

      <div className="mb-3">
        <h2>New Submissions</h2>
        <EmbeddedIframe title="New Submissions" src="https://airtable.com/embed/shrbgSefEwH2I8pgM?backgroundColor=red&viewControls=on" />
      </div>
    </div>
  )
};

export default AdminDashboard;