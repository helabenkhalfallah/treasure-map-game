module.exports = {
  apps: [
    {
      name: 'treasure-map-cms',
      script: './api/index.js',
      watch: true,
      // disable pm2 default logs
      out_file: '/dev/null',
      error_file: '/dev/null',
    },
  ],
};
