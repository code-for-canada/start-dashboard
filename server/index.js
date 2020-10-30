require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 8080;

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


  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}

