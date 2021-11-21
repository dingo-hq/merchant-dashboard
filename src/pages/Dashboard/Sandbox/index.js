import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DashboardPage from '../../../components/DashboardPage';
import getCatalogItems from '../../../api/getCatalogItems';
import ItemsList from './ItemsList';
import styles from './styles.module.css';

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
            <section className={styles.container}>
                <ItemsList items={recommendedItems} />
            </section>
        </DashboardPage>
    );
};

Sandbox.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Sandbox;
