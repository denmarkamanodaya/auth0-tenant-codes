const { dump } = require('auth0-deploy-cli');

// Create the name for our dump
// const today = new Date()
// var date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`
// var time = `${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`
// const datetime = `${date}_${time}`

dump({
  // output_folder: `dump/${datetime}`,
  output_folder: './src',
  format: 'yaml',
  config: {
    // This should be fetched through .env
    AUTH0_CLIENT_ID: "ntcSPHUIA4hfc5qppQ76rxvt7Stzebv9",
    AUTH0_CLIENT_SECRET: "KGYMGfXsNOMk3xyQNx9mnaCgVX8e6n3e9rjxcDxsAQlqw-mXXpMpNhTBUWgD-AA_",
    AUTH0_DOMAIN: "dev-ainxkc0mnpi0u81a.us.auth0.com"
  },
})
  .then(() => {
    console.log('Auth0 configuration export successful');
  })
  .catch((err) => {
    console.log('Error during Auth0 configuration export:', err);
  });