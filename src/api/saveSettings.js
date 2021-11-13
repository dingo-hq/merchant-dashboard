import authRequest from '../utils/authRequest';

export default async function saveSettings(data) {
    return authRequest('PUT', '/merchants/config', data);
}
