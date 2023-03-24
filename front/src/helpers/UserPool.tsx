import React from "react";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

const PoolData: {UserPoolId: string, ClientId: string} = {
    UserPoolId: `${process.env.REACT_APP_AUTH_USER_POOL_ID}`,
    ClientId: `${process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID}`
};

const userPoolData:AmazonCognitoIdentity.CognitoUserPool = new AmazonCognitoIdentity.CognitoUserPool(PoolData);

export default userPoolData;