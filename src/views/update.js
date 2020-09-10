import React from "react";
import DefaultLayout from './default-layout';

const StatusUpdate = () => (
  <DefaultLayout>
    <iframe title="Artwork status update form" className="airtable-embed" src="https://airtable.com/embed/shrvLFrcxroCiCWgr?backgroundColor=red" frameBorder="0" width="100%" height="1125" style={{ background: 'transparent', border: '1px solid #ccc' }}></iframe>
  </DefaultLayout>
);

export default StatusUpdate;
