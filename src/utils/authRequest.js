import axios from 'axios';
import { BASE_URL } from '../constants';

export default async function authRequest(method, url, data = {}) {
    const response = await axios({
        url: `${BASE_URL}${url}`,
        method,
        data,
        withCredentials: true,
    });

    return response.data;
}
