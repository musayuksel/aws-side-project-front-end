import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { config } from '../../aws_config';
import {
  SignUpUserWithCognitoArgsTypes,
  TSignUpUserWithCognitoSetUserInfos,
  TSignUpUserWithCognitoSetShowVerificationForm,
} from './signUpUserWithCognito.types';

export const signUpUserWithCognito = (
  userInfos: SignUpUserWithCognitoArgsTypes,
  setUserInfos: TSignUpUserWithCognitoSetUserInfos,
  setShowVerificationForm: TSignUpUserWithCognitoSetShowVerificationForm
) => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolWebClientId,
  });

  userPool.signUp(userInfos.email, userInfos.password, [], [], (err, data) => {
    if (err) {
      console.error(err);
    } else if (data) {
      setUserInfos((prev) => ({
        ...prev,
        cognitoUserName: data.userSub,
      }));
      setShowVerificationForm(true);
    }
  });
};
