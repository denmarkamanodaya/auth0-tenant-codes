const ManagementClient = require('auth0').ManagementClient;

exports.onExecutePostLogin = async (event, api) => {

  console.log("CREATE_ORG_ACTION");

  console.log("MY EVENT CLIENT", event.client);
  console.log("MY EVENT CLIENT METADATA", event.client.metadata);
  console.log("MY EVENT CONNECTION", event.connection);
  console.log("ADDED FROM AUTH0 CICD");

  const management = new ManagementClient({
      domain: event.secrets.AUTH0_DOMAIN,
      clientId: event.secrets.CLIENT_ID,
      clientSecret: event.secrets.CLIENT_SECRET,
  });

  const organizations = event.user.user_metadata?.organizations;

  if(organizations) {
    organizations.forEach(function(organization) {
      management.organizations.getByName({"name": organization.name}, function(err) {
        if(err) {
          management.organizations.create({
            "name": organization.name,
            "display_name": organization.name.replace(/-/g, ' '),
          });
          return
        }
      });
    });
  }

};
