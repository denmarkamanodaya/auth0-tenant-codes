async function login(email, password, callback) {
    const config = {
        apiURL: "https://jsonplaceholder.typicode.com/users/10",
        identities: {
            provider: "auth0",
            connection: "dk-test",
            social: false,
        },
        emailVerified: true,
        options: {
            method: "GET",
            body: null,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
        },
        legacyData: {
          organizations: [
            {name: "test-org-1", role: "member"},
            {name: "test-org-2", role: "admin"},
          ],
          mockUserID: "66666bee4f00282480bf2c0a",
            mockPhoneNumber: "+15551234567",
        },
    };
  
    request({
        url: config.apiURL,
        method: config.options.method,
        headers: config.options.headers,
        json: true,
    }, function(error, response, body) {
        const callbackProfile = {
            email: email,
            //username: config.mockEmail.split("@")[0].toLowerCase(),
            user_id: `${config.legacyData.mockUserID}`,
            email_verified: config.emailVerified,
            user_metadata: {
                language: "en",
                  // Need to add role and organization from legacy platform
                  // Well use this metadata from our post login action execution
                  organizations: config.legacyData.organizations,
            },
            app_metadata: {
                plan: "full"
            },
            mfa_factors: [
                {
                    phone: {
                        value: config.legacyData.mockPhoneNumber
                    }
                }
            ]
        };
        callback(null, callbackProfile);
    });
  }