function login(email, password, callback) {
    callback(null, {
      user_id: "custom-db|" + email,
      nickname: "testuser",
      email: email
    });
}
