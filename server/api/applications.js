require('dotenv').config()
const fetch = require('node-fetch')
const { methodNotImplemented, checkScopes, getUserData } = require('./common')
const { SUBMITTABLE_SUBMISSIONS_ENDPOINT } = require('./utils/constants')

const fetchPaginatedApplications = async(userId, page) => {
  const encodedToken = Buffer.from(
    process.env.SUBMITTABLE_ACCESS_TOKEN
  ).toString('base64')
  const url = `${SUBMITTABLE_SUBMISSIONS_ENDPOINT}&assignedTo=${userId}&status=inprogress&archived=0&sort=submitted&dir=desc&page=${page}`
  console.log("Fetching applications from Submittable", url)
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${encodedToken}`
    }
  })
  const data = await response.json()
  return data
}

const getSubmittableApplications = async (req, res) => {
  try {
    const { user, error } = await getUserData(req)

    if (error) {
      return res.status(500).send({ error })
    }

    const userId = user['https://streetartoronto.ca/submittable_staff_id']

    if (!userId) {
      return res.status(401).send({ error: 'No Submittable Staff ID provided.'})
    }

    let currentPage = 0
    let totalPages = 1
    let applications = []

    while (currentPage < totalPages) {
      const { total_pages, current_page, items } = await fetchPaginatedApplications(userId, currentPage + 1)

      if (!total_pages || !current_page || !items) {
        break;
      }

      currentPage = current_page
      totalPages = total_pages
      applications = applications.concat(items)
    }

    return res.status(200).send({ items: applications })
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
