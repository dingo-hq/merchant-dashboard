import authRequest from '../utils/authRequest';

export default async function getStatistics() {
    const [numbersResponse, countByDayResponse] = await Promise.all([
        authRequest('GET', '/statistics/numbers'),
        authRequest('GET', '/statistics/recommended-count-by-day'),
    ]);

    const { data: numbersData } = numbersResponse;
    const { data: countByDay } = countByDayResponse;

    return { countByDay, numbers: { ...numbersData } };
}
