import authRequest from '../utils/authRequest';

export default async function updateCatalogItem(id, data) {
    return authRequest('PUT', `/catalog/${id}/enabled`, data);
}
