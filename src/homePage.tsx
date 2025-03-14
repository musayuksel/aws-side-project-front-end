// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://mxc3jz3o8l.execute-api.eu-west-1.amazonaws.com/prod';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const fetchData = async ({
  url,
  method = HttpMethod.GET,
  body = null,
}: {
  url: string;
  method?: HttpMethod;
  body?: any;
}) => {
  const token = sessionStorage.getItem('idToken');

  const completeUrl = BASE_URL + url;

  console.log(completeUrl, `>>>>>>>>>>>completeUrl`);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const requestOptions: RequestInit = {
    method,
    headers,
    body,
  };
  const response = await fetch(completeUrl, requestOptions);

  // Add this part to actually get the data from the response
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data, `>>>>>>>>>>>data`);
  return data;
};

function parseJwt(token) {
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
  fetchData({ url: '/categories/' });
  const navigate = useNavigate();
  const idToken = parseJwt(sessionStorage.idToken.toString());
  const accessToken = parseJwt(sessionStorage.accessToken.toString());
  console.log(`Amazon Cognito ID token encoded: ${sessionStorage.idToken.toString()}`);
  console.log('Amazon Cognito ID token decoded: ');
  console.log(idToken);
  console.log(`Amazon Cognito access token encoded: ${sessionStorage.accessToken.toString()}`);
  console.log('Amazon Cognito access token decoded: ');
  console.log(accessToken);
  console.log('Amazon Cognito refresh token: ');
  console.log(sessionStorage.refreshToken);
  console.log('Amazon Cognito example application. Not for use in production applications.');
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <h1>Hello World</h1>
      <p>See console log for Amazon Cognito user tokens.</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
