const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

require('dotenv').config()
const handleLocations = require('./api/location')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all('/api/location', handleLocations)

// Only in production is the server the main entry point,
// so only then serve built static files from filesystem.
//
// (In development, React files are served by webpack-dev-server
// from memory, which also proxies the API. See: `src/setupProxy.js` )
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', 'build')));

  // Handle React routing, return all other requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 3000);
