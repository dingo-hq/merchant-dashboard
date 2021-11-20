import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DashboardPage from '../../../components/DashboardPage';
import getCatalogItems from '../../../api/getCatalogItems';

const Sandbox = ({ pageName }) => {
    const [recommendedItems, setRecommendedItems] = useState([]);

    useEffect(async () => {
        try {
            const { catalogItems } = await getCatalogItems({
                recommended: true,
            });

            setRecommendedItems(catalogItems);
        } catch {}
    }, []);

    return (
        <DashboardPage
            heading={pageName}
            subheading="Simulate and preview how items are recommended to customers"
        >
            <ul>
                {recommendedItems.map(({ name }) => (
                    <li>{name}</li>
                ))}
            </ul>
        </DashboardPage>
    );
};

Sandbox.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Sandbox;
