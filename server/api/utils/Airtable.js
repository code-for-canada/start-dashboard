const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN })
    .base(process.env.AIRTABLE_BASE)

const locationsTable = base('locations')
const artistsTable = base('artist_profiles')

module.exports = { locationsTable, artistsTable }
