module.exports = {
  apps: [
    {
      name: 'treasure-map-bfb',
      script: './api/index.js',
      watch: true,
      // disable pm2 default logs
      out_file: '/dev/null',
      error_file: '/dev/null'
    },
  ],
};
