const { locationsTable } = require('./utils/Airtable')

const createLocation = (req, res) => {
  console.log("req.body", req.body)
  const location = req.body

  locationsTable.create(
    [location],
    (err, records) => {
      if (err) {
        console.error(err);
        return res.
          status(500)
          .send({ error: err })
      }
      records.forEach(function (record) {
        console.log(record.getId());
        return res
          .status(201)
          .send({ recordId: record.getId() })
      });
    }
  );
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
    case 'POST':
      createLocation(req, res)
      break
    case 'GET':
      res.send('hello')
      break
    default:
      methodNotImplemented(req, res)
  }
}
