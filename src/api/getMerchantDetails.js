import authRequest from '../utils/authRequest';

export default function getMerchantDetails() {
    return authRequest('GET', '/merchants');
}
