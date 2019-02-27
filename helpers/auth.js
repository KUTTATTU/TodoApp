const jwt = require('jsonwebtoken');
const credentials = {
    client: {
        id: "2ee21432-6572-43d7-b64a-b863c87bb205",
        secret: "zvsVSAO2976xyrlYTE3:;-+",
    },
    auth: {
        tokenHost: 'https://login.microsoftonline.com',
        authorizePath: 'common/oauth2/v2.0/authorize',
        tokenPath: 'common/oauth2/v2.0/token'
    }
};
const oauth2 = require('simple-oauth2').create(credentials);

function getAuthUrl() {
    const returnVal = oauth2.authorizationCode.authorizeURL({
        redirect_uri: "http://localhost:8090/todos/authorize",
        scope: "openid profile User.Read"
    });
    console.log(`Generated auth url: ${returnVal}`);
    return returnVal;
}



async function getTokenFromCode(auth_code) {
    let result = await oauth2.authorizationCode.getToken({
        code: auth_code,
        redirect_uri: "http://localhost:8090/todos/authorize",
        scope: "openid profile User.Read"
    });

    const token = oauth2.accessToken.create(result);
    // console.log('Token created: ', token.token);

    // Parse the identity token
    const user = jwt.decode(token.token.id_token);
    console.log('Token created for : ', user.name);

    //return token.token.access_token;
    return user.name;
}

exports.getTokenFromCode = getTokenFromCode;

exports.getAuthUrl = getAuthUrl;