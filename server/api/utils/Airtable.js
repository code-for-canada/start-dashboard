const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE
)

const locationsTable = base('locations')
const artistsTable = base('artist_profiles')
const accountsTable = base('accounts')
const artworksTable = base('artworks')
const artworkUpdatesTable = base('artwork_updates')
const reportsTable = base('reports')
const reportResponsesTable = base('report_responses')

module.exports = { locationsTable, artistsTable, accountsTable, artworksTable, artworkUpdatesTable, reportsTable, reportResponsesTable }
