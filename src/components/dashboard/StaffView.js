import React from "react";

const StaffDashboard = (user) => {
  return (
    <div>
      <h1 className="mb-4">Staff Dashboard</h1>

      <div className="mb-3">
        <h2>Artwork Status Updates</h2>
        <iframe title="Artwork Status Updates" className="airtable-embed" src="https://airtable.com/embed/shrxrrqGr1tu5UKt9?backgroundColor=red&viewControls=on" frameBorder="0" width="100%" height="533" style={{ background: 'transparent', border: '1px solid #ccc' }}></iframe>
      </div>

      <div className="mb-3">
        <h2>Artwork Progress Board</h2>
        <iframe title="Artwork Progress Board" className="airtable-embed" src="https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on" frameBorder="0" width="100%" height="533" style={{ background: 'transparent', border: '1px solid #ccc' }}></iframe>
      </div>

      <div className="mb-3">
        <h2>New Submissions</h2>
        <iframe title="New Submissions" className="airtable-embed" src="https://airtable.com/embed/shrbgSefEwH2I8pgM?backgroundColor=red&viewControls=on" frameBorder="0" width="100%" height="533" style={{background: "transparent", border: "1px solid #ccc"}}></iframe>
      </div>
    </div>
  )
};

export default StaffDashboard;