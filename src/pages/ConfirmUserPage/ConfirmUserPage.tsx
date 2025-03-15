import { useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmSignUp } from '../../authService';
import { TConfirmUserArgs } from './ConfirmUserPage.types';

export const ConfirmUserPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfos, setUserInfos] = useState<TConfirmUserArgs>({
    email: location.state?.email || '',
    confirmationCode: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfos((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await confirmSignUp(userInfos.email, userInfos.confirmationCode);
      alert('Account confirmed successfully!\nSign in on next page.');
      navigate('/login');
    } catch (error) {
      alert(`Failed to confirm account: ${error}`);
    }
  };

  return (
    <div className="loginForm">
      <h2>Confirm Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="inputText"
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
            type="text"
            name="confirmationCode"
            value={userInfos.confirmationCode}
            onChange={handleChange}
            placeholder="Confirmation Code"
            required
          />
        </div>
        <button type="submit">Confirm Account</button>
      </form>
    </div>
  );
};
