import config from '../config';

console.log('config is', config);
console.log(
    'process.env.REACT_APP_ENVIRONMENT',
    process.env.REACT_APP_ENVIRONMENT,
);

export const BASE_URL = config[process.env.REACT_APP_ENVIRONMENT].baseUrl;
export const SQUARE_OAUTH_URL = `${BASE_URL}/oauth`;
export const APP_LOGOUT_URL = `${BASE_URL}/oauth/logout`;
