import authRequest from '../utils/authRequest';

export default async function getCatalogItems({ recommended = false } = {}) {
    const { data } = await authRequest('GET', '/catalog');
    const { catalogItems, disableWarnings } = data;

    const items = recommended
        ? catalogItems.filter(({ enabled }) => enabled)
        : catalogItems;

    return { catalogItems: items, disableWarnings };
}
