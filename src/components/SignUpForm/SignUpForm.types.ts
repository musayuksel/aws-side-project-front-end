import { SignUpUserWithCognitoArgsTypes } from '../../utils';

export type TSignUpFormProps = {
  userInfos: SignUpUserWithCognitoArgsTypes;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
