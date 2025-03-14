import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';
import { AuthenticateUserWithCognitoArgsTypes, AuthenticateUserWithCognitoSetTokenTypes } from './authenticateUserWithCognito.types';

export const authenticateUserWithCognito = (
  userInfos: AuthenticateUserWithCognitoArgsTypes,
  setToken: AuthenticateUserWithCognitoSetTokenTypes,
) => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolWebClientId,
  });

  const authenticationData = {
    Username: userInfos.email,
    Password: userInfos.password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const cognitoUser = new CognitoUser({
    Username: userInfos.email,
    Pool: userPool,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      sessionStorage.setItem("idToken", result.getIdToken().getJwtToken());
      setToken(result.getAccessToken().getJwtToken());

      sessionStorage.setItem(
        "accessToken",
        result.getAccessToken().getJwtToken()
      );
      sessionStorage.setItem(
        "refreshToken",
        result.getRefreshToken().getToken()
      );
    },
    onFailure: (err: Error) => {
      console.error('Authentication failed:', err);
      //TODO: Handle authentication failure
    },
  });
};
