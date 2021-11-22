import authRequest from '../utils/authRequest';

export default async function simulateRecommendations(itemIds) {
    return authRequest('POST', '/sandbox/simulate', itemIds);
}
