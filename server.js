const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
require('dotenv').config()
const handleLocations = require('./api/location')

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.all('/api/location', handleLocations)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'build')));

//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
// }

app.listen(process.env.PORT || 8080);
