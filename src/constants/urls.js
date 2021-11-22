import config from '../config';

export const BASE_URL = config[process.env.REACT_APP_ENVIRONMENT].baseUrl;
export const SQUARE_OAUTH_URL = `${BASE_URL}/oauth`;
export const APP_LOGOUT_URL = `${BASE_URL}/oauth/logout`;
