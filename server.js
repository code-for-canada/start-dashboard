const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var Airtable = require('airtable')
require('dotenv').config()

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_TOKEN }).base(process.env.REACT_APP_AIRTABLE_BASE)

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/location', function(req, res) {
  console.log("req.body", req.body)
  const location = req.body
  base('locations').create([
    location
  ], function(err, records) {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: err })
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
      return res.status(201).send({ recordId: record.getId() })
    });
  });
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 8080);