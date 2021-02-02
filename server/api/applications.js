require('dotenv').config()
const fetch = require('node-fetch')
const { methodNotImplemented, checkScopes, getUserData } = require('./common')
const { SUBMITTABLE_SUBMISSIONS_ENDPOINT } = require('./utils/constants')

const getSubmittableApplications = async (req, res) => {
  try {
    const page = req.query.page
    const { user, error } = await getUserData(req)

    if (error) {
      return res.status(500).send({ error })
    }

    const userId = user['https://streetartoronto.ca/submittable_staff_id']

    const encodedToken = Buffer.from(
      process.env.SUBMITTABLE_ACCESS_TOKEN
    ).toString('base64')
    const url = `${SUBMITTABLE_SUBMISSIONS_ENDPOINT}&assignedTo=${userId}&status=inprogress&archived=0&sort=submitted&dir=desc&page=${page}`
    const response = await fetch(url, {
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
      checkScopes(req, res, getSubmittableApplications, ['is:staff', 'is:reviewer'])
      break
    default:
      methodNotImplemented(req, res)
  }
}
