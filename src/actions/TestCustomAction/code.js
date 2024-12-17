exports.onExecutePostLogin = async (event, api) => {
  try {
    const xplorId = 3000;
    setCustomClaims(event, api, xplorId);
  } catch (error) {
    throw new Error('An error occurred while processing the request.');
  }
};

function setCustomClaims(event, api, xplorId) {
    const productType = event.user.app_metadata.productType || 'guest';
    const customClaimData = { xplorId }; 

    if (productType === 'productA') {
        customClaimData.level = "full";
        customClaimData.features = ["feature1", "feature2", "feature3"];
    } else if (productType === 'productB') {
        customClaimData.level = "limited";
        customClaimData.features = ["feature1"];
    } else {
        customClaimData.level = "guest";
        customClaimData.features = [];
    }

    customClaimData.xplorId= xplorId;

    api.accessToken.setCustomClaim("https://xplorsampleapi.com/product_data",  api);
    api.idToken.setCustomClaim('https://xplorsampleapi.com/products',  api);
  }
