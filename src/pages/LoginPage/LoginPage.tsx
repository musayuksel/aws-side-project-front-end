import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../utils/authService/authService';
import { TSignUpUserWithCognitoArgs } from './LoginPage.types';

export const LoginPage: FC = () => {
  const [userInfos, setUserInfos] = useState<TSignUpUserWithCognitoArgs>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfos((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const session = await signIn(userInfos.email, userInfos.password);
      console.log('Sign in successful', session);
      if (session && typeof session.AccessToken !== 'undefined') {
        sessionStorage.setItem('accessToken', session.AccessToken);
        if (sessionStorage.getItem('accessToken')) {
          window.location.href = '/home';
        } else {
          console.error('Session token was not set properly.');
        }
      } else {
        console.error('SignIn session or AccessToken is undefined.');
      }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (userInfos.password !== userInfos.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await signUp(userInfos.email, userInfos.password);
      navigate('/confirm', { state: { email: userInfos.email } });
    } catch (error) {
      alert(`Sign up failed: ${error}`);
    }
  };

  return (
    <div className="loginForm">
      <h1>WelcomeNew</h1>
      <h4>{isSignUp ? 'Sign up to create an account' : 'Sign in to your account'}</h4>
      <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
        <div>
          <input
            className="inputText"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={userInfos.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            className="inputText"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={userInfos.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        {isSignUp && (
          <div>
            <input
              className="inputText"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={userInfos.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
        )}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
      </button>
    </div>
  );
};
