const { deployLogTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes } = require('./common')
const { GITHUB_REPO_DISPATCH_ENDPOINT } = require('./utils/constants')
const fetch = require('node-fetch')

const publishMap = async (req, res) => {
  const event_type = process.env.REACT_APP_ENV === 'production' ? 'publish_production' : 'publish'
  console.log("Dispatched event")
  console.log({ event_type })
  try {
    const result = await fetch(GITHUB_REPO_DISPATCH_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.everest-preview+json'
      },
      body: JSON.stringify({ event_type })
    })
    if (result.status === 204) {
      await deployLogTable.create([{ fields: { auth0_id: req.user.sub }}])
      return res.status(200).send({ result: "OK" })
    } else {
      return res.status(400).send({ error: `Failed to post to Github with status ${result.status}`})
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send({ error: err.message })
  }
}

const getLatestDeployLog = async (req, res) => {
  try {
    const records = await deployLogTable.select({
      maxRecords: 1,
      cellFormat: 'string',
      timeZone: 'America/Toronto',
      userLocale: 'en-ca',
      sort: [{
        field: 'uid',
        direction: 'desc'
      }]
    }).firstPage()
    const items = records.map(rec => ({ ...rec.fields, id: rec.id }))
    return res.status(200).send({ items })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ error: err.message })
  }
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'GET':
      checkScopes(req, res, getLatestDeployLog, ['is:staff'])
      break
    case 'POST':
      checkScopes(req, res, publishMap, ['is:staff'])
      break
    default:
      methodNotImplemented(req, res)
  }
}
