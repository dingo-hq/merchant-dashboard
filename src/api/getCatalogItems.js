import authRequest from '../utils/authRequest';

export default async function getCatalogItems() {
    return authRequest('GET', '/catalog');
}
