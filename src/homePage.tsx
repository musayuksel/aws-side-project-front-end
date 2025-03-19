import { useNavigate } from 'react-router-dom';
import { useFetchData } from './hooks/useFetch/useFetch';
import { useEffect } from 'react';

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
}

const HomePage = () => {
  const { data, isLoading, error, fetchData } = useFetchData();

  useEffect(() => {
    console.log('useEffect running');
    fetchData({ url: '/categories/' });
  }, [fetchData]);

  const navigate = useNavigate();
  const idToken = parseJwt(sessionStorage.idToken.toString());
  const accessToken = parseJwt(sessionStorage.accessToken.toString());

  console.log('app is running');
  console.log(`Amazon Cognito ID token encoded: ${sessionStorage.idToken.toString()}`);
  console.log('Amazon Cognito ID token decoded: ');
  console.log(idToken);
  // console.log(`Amazon Cognito access token encoded: ${sessionStorage.accessToken.toString()}`);
  console.log('Amazon Cognito access token decoded: ');
  console.log(accessToken);
  // console.log('Amazon Cognito refresh token: ');
  // console.log(sessionStorage.refreshToken);
  // console.log('Amazon Cognito example application. Not for use in production applications.');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <div>
        <h1>Hello World</h1>
        <p>See console log for Amazon Cognito user tokens.</p>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default HomePage;
