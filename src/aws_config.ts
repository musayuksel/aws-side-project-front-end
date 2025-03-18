export const config = {
  region: import.meta.env.VITE_AWS_REGION || '',
  userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID || '',
  clientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID || '',
  API_URL: import.meta.env.VITE_API_URL || '',
};
