import authRequest from '../utils/authRequest';

export default async function getStatistics() {
    return authRequest('GET', '/statistics/recommended-count-by-day');
}
