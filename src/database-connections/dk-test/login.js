async function login(email, password, callback) {
  const config = {
    customDBName: "dk-test", // Prefix user identifier, usually custom database name value
    emailVerified: true, // Default email is verified value. Since we are just migrating the users, theoritically email verification is true
    language: "en", // Default language option

    // Replace your user endpoint here, if required Authorization token please
    // add it on the Header section option.
    // apiURL: "https://2bsvo6b74l.execute-api.us-east-1.amazonaws.com/dev/v1/migrate",
    // https://run.mocky.io/v3/e22521f0-54d2-4a08-8660-f5f10a9f92a8
    apiURL: "https://run.mocky.io/v3/84e83198-25ad-49f3-bb6f-7ba96ab986a2",
    options: {
      body: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${configuration.api_token}`,
      },
    },
  };

  request(
    {
      url: config.apiURL,
      headers: config.options.headers,
      method: "POST",
      json: {
        email: email,
        password: password,
      },
    },
    function (error, response, body) {
      // Gated response for Invalid Credentials & API Error
      if (response.statusCode !== 200)
        return callback(new Error(`User Migration Error | ${response.statusCode}`));

      // Generate User Profile
      const callbackProfile = {
        email: email,
        name: `${body.data.FirstName} ${body.data.LastName}`,
        user_id: `${config.customDBName}|${email}`,
        email_verified: config.emailVerified,
        user_metadata: {
          language: config.language,
          UserChainId: body.data.UserChainId,
          UserGroupId: body.data.UserGroupId,
          IsSuperUser: body.data.IsSuperUser,
          Centres: body.data.Centres,
        },
      };

      // Continue perform Lazy Migration
      callback(null, callbackProfile);
    }
  );
}
