require('dotenv').config()
const fetch = require('node-fetch')
const { methodNotImplemented } = require('./common')
const { SUBMITTABLE_CATEGORIES_ENDPOINTS } = require('./utils/constants')

const getSubmittableForms = async (req, res) => {
  try {
    const encodedToken = Buffer.from(
      process.env.SUBMITTABLE_ACCESS_TOKEN
    ).toString('base64')
    const response = await fetch(SUBMITTABLE_CATEGORIES_ENDPOINTS, {
      headers: {
        Authorization: `Basic ${encodedToken}`
      }
    })
    const data = await response.json()
    return res.status(200).send(data)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error: error })
  }
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'GET':
      getSubmittableForms(req, res)
      break
    default:
      methodNotImplemented(req, res)
  }
}
