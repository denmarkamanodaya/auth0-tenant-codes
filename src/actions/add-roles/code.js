/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  // Get the assigned roles from the event objectconst roles = event.authorization.roles;
    // Check if user is part of an organization and roles are availableif(roles && roles.length > 0) {
    // Set custom claim with the roles on the access token and ID tokenconst rolesClaimValue = roles.join(','); // Join roles into a single string, adjust as needed
    
    const app = 'dk-test';
    
    const roles = event.authorization?.roles;
    const rolesClaimValue = roles?.join(',');
    
    console.log(rolesClaimValue);

    api.accessToken.setCustomClaim(`${app}_roles`, rolesClaimValue);
    api.idToken.setCustomClaim(`${app}_roles`, rolesClaimValue);

    // api.accessToken.setCustomClaim(`${app}_roles`, "TEST");
    // api.idToken.setCustomClaim(`${app}_roles`, "TEST");
  }


/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };
