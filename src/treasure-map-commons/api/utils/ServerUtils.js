import HttpsClient from 'https';
import HttpClient from 'http';

const createServer = ({
  app,
  config,
}) => {
  // Create the HTTPS or HTTP server, per configuration
  let httpServer;
  if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = HttpsClient.createServer(
      {
        key: config.key,
        cert: config.cert,
      },
      app
    );
  } else {
    httpServer = HttpClient.createServer(app);
  }

  return httpServer;
};

const ServerUtils = {
  createServer,
};

export default ServerUtils;
