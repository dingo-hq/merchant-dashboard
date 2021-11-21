import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'evergreen-ui';
import DashboardPage from '../../../components/DashboardPage';
import getCatalogItems from '../../../api/getCatalogItems';
import ItemsGrid from './ItemsGrid';
import styles from './styles.module.css';

const Sandbox = ({ pageName }) => {
    const [recommendedItems, setRecommendedItems] = useState([]);
    const [selectedItemsCount, setSelectedItemsCount] = useState(0);
    const isSimulateDisabled = selectedItemsCount === 0;

    useEffect(async () => {
        try {
            const { catalogItems } = await getCatalogItems();

            setRecommendedItems(catalogItems);
        } catch {}
    }, []);

    const handleItemsChange = (items) => {
        setSelectedItemsCount(items.length);
    };

    const simulateButton = (
        <Button
            appearance="primary"
            size="large"
            disabled={isSimulateDisabled}
            className={styles.simulate}
        >
            Simulate {selectedItemsCount} selected items
        </Button>
    );

    return (
        <DashboardPage
            heading={pageName}
            subheading="Select items below to simulate and preview how items are recommended to customers"
            sideElement={simulateButton}
        >
            <section className={styles.container}>
                <ItemsGrid
                    items={recommendedItems}
                    onChange={handleItemsChange}
                />
            </section>
        </DashboardPage>
    );
};

Sandbox.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Sandbox;
