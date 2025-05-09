exports.onExecutePostLogin = async (event, api) => {
  if (event.authentication?.methods[0].name === "federated") {
    const ManagementClient = require("auth0").ManagementClient;

    const management = new ManagementClient({
      domain: event.secrets.AUTH0_DOMAIN,
      clientId: event.secrets.CLIENT_ID,
      clientSecret: event.secrets.CLIENT_SECRET,
    });

    const { data: candidateUsers } = await management.usersByEmail.getByEmail({
      email: event.user.email,
    });

    // Only one user is returned then no linking necessary
    // delete generated sso social
    if (!Array.isArray(candidateUsers) || candidateUsers.length === 1) {
      // return;
      await management.users.delete({ id: event.user.user_id });
      api.access.deny("TEST: Auth0 User Not Found! Denying Social Login");
    }

    // Get identities of the user
    const candidateIdentities = candidateUsers.flatMap(
      (user) => user.identities
    );
    // captures user with only 1 identity
    // TODO: check multiple social account linking
    if (candidateIdentities.length <= 1) return;

    // Returns the candidate that already exists (old identity)
    const oldIdentity = candidateIdentities.find(
      (identity) => identity.provider !== event.connection.strategy
    );

    // Build primary user_id and perform account linking
    await management.users.link(
      { id: `${oldIdentity.provider}|${oldIdentity.user_id}` },
      {
        provider: event.connection.strategy,
        connection_id: event.connection.id,
        user_id: event.user.user_id,
      }
    );
  }
};
