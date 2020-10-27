require('dotenv').config()
const axios = require('axios');

const getSubmittableForms = async (req, res) => {
  const endpoint = "https://api.submittable.com/v1/categories?count=200"

  try {
    const response = await axios.get(endpoint, { auth: { username: process.env.SUBMITTABLE_ACCESS_TOKEN }});
    return res.status(200).send(response.data)
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error })
  }
}

const methodNotImplemented = (req, res) => {
  return res
    .status(501)
    .send({
        message: `Unsupported method: ${req.method}`
    })
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
