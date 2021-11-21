import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'evergreen-ui';
import DashboardPage from '../../../components/DashboardPage';
import getCatalogItems from '../../../api/getCatalogItems';
import OverlaySpinner from '../../../components/OverlaySpinner';
import ItemsGrid from './ItemsGrid';
import styles from './styles.module.css';

const Sandbox = ({ pageName }) => {
    const [recommendedItems, setRecommendedItems] = useState([]);
    const [selectedItemsCount, setSelectedItemsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const isSimulateDisabled = selectedItemsCount === 0 || isSimulating;

    useEffect(async () => {
        try {
            setIsLoading(true);
            const { catalogItems } = await getCatalogItems();

            setRecommendedItems(catalogItems);
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleItemsChange = (items) => {
        setSelectedItemsCount(items.length);
    };

    const handleSimulateClick = (e) => {
        e.preventDefault();
    };

    const simulateButton = (
        <Button
            appearance="primary"
            size="large"
            disabled={isSimulateDisabled}
            className={styles.simulate}
            onClick={handleSimulateClick}
            isLoading={isSimulating}
        >
            Simulate {selectedItemsCount} selected items
        </Button>
    );

    return (
        <DashboardPage
            heading={pageName}
            subheading="Select items below to simulate and preview what items could be recommended to customers"
            sideElement={simulateButton}
        >
            <section className={styles.container}>
                <ItemsGrid
                    items={recommendedItems}
                    onChange={handleItemsChange}
                />
            </section>
            <OverlaySpinner isShown={isLoading} />
        </DashboardPage>
    );
};

Sandbox.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Sandbox;
