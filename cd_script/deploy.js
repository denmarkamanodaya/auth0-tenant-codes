const { deploy } = require('auth0-deploy-cli');

deploy({
  input_file: './src/tenant.yaml',
  config: {
    // This should be fetched through .env
    AUTH0_CLIENT_ID: "ntcSPHUIA4hfc5qppQ76rxvt7Stzebv9",
    AUTH0_CLIENT_SECRET: "KGYMGfXsNOMk3xyQNx9mnaCgVX8e6n3e9rjxcDxsAQlqw-mXXpMpNhTBUWgD-AA_",
    AUTH0_DOMAIN: "dev-ainxkc0mnpi0u81a.us.auth0.com"
  },
})
  .then(() => {
    console.log('Auth0 configuration applied to tenant successful');
  })
  .catch((err) => {
    console.log('Error when applying configuration to Auth0 tenant:', err);
  });