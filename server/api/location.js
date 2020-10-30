const { locationsTable } = require('./utils/Airtable')
const { methodNotImplemented } = require('./common')

const createLocation = (req, res) => {
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
