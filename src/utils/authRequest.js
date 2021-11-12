import axios from 'axios';
import { BASE_URL } from '../constants';

export default function authRequest(method, url, data = {}) {
    return axios({
        url: `${BASE_URL}${url}`,
        method,
        data,
        withCredentials: true,
    });
}
