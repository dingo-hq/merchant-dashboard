import authRequest from '../utils/authRequest';

export default async function getMerchantDetails() {
    return authRequest('GET', '/merchants');
}
