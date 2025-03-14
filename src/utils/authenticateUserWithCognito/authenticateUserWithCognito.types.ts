export type AuthenticateUserWithCognitoArgsTypes = {
  email: string;
  password: string;
};

export type AuthenticateUserWithCognitoSetTokenTypes = {
  (accessToken: string): void;
};
