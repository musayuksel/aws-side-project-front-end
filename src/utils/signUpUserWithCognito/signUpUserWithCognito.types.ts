export type SignUpUserWithCognitoArgsTypes = {
  email: string;
  password: string;
  verificationCode: string;
  //   cognitoUserName: string;
  //   fistName: string;
  //   lastName: string;
};

export type TSignUpUserWithCognitoSetUserInfos = React.Dispatch<
  React.SetStateAction<SignUpUserWithCognitoArgsTypes>
>;

export type TSignUpUserWithCognitoSetShowVerificationForm = React.Dispatch<
  React.SetStateAction<boolean>
>;
