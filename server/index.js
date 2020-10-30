require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  const handleLocations = require('./api/location')
  const handleArtist = require('./api/artist')
  const handleForms = require('./api/forms')

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.all('/api/location', handleLocations)
  app.all('/api/artist', handleArtist)
  app.all('/api/forms', handleForms)

  // Only in production is the server the main entry point,
  // so only then serve built static files from filesystem.
  //
  // (In development, React files are served by webpack-dev-server
  // from memory, which also proxies the API. See: `src/setupProxy.js` )
  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    // Handle React routing, return all other requests to React app
    app.get('*', function(req, res) {
      response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });
  }

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}

