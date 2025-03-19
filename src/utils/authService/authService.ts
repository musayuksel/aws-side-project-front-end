import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  type ResendConfirmationCodeCommandInput,
  type InitiateAuthCommandInput,
  type SignUpCommandInput,
  type ConfirmSignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { config } from '../../aws_config';

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

export const signIn = async (username: string, password: string) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    if (AuthenticationResult) {
      sessionStorage.setItem('idToken', AuthenticationResult.IdToken || '');
      sessionStorage.setItem('accessToken', AuthenticationResult.AccessToken || '');
      sessionStorage.setItem('refreshToken', AuthenticationResult.RefreshToken || '');
      return AuthenticationResult;
    }
  } catch (error) {
    console.error('Error signing in: ', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  const params: SignUpCommandInput = {
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    console.log('Sign up success: ', response);
    return response;
  } catch (error) {
    console.error('Error signing up: ', error);
    throw error;
  }
};

export const confirmSignUp = async (username: string, code: string) => {
  const params: ConfirmSignUpCommandInput = {
    ClientId: config.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log('User confirmed successfully');
    return true;
  } catch (error) {
    console.error('Error confirming sign up: ', error);
    throw error;
  }
};

export const resendConfirmationCode = async (username: string) => {
  const params: ResendConfirmationCodeCommandInput = {
    ClientId: config.clientId,
    Username: username,
  };
  try {
    const command = new ResendConfirmationCodeCommand(params);
    await cognitoClient.send(command);
    console.log('Confirmation code resent');
    return true;
  } catch (error) {
    console.error('Error resending confirmation code: ', error);
    throw error;
  }
};
