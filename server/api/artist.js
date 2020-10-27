const { artistsTable } = require('./utils/Airtable')

const getArtist = (req, res) => {
  const userEmail = req.query.email;
  artistsTable
    .select({ filterByFormula: `{email} = '${userEmail}'` })
    .firstPage((err, records) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: err })
      }
      return res.status(200).send({ records: records })
    });
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
      getArtist(req, res)
      break
    default:
      methodNotImplemented(req, res)
  }
}
