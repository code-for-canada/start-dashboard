const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_TOKEN })
    .base(process.env.REACT_APP_AIRTABLE_BASE)

const locationsTable = base('locations')
const artistsTable = base('artist_profiles')

module.exports = { locationsTable, artistsTable }
