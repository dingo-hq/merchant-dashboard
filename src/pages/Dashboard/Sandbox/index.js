import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState, ShopIcon } from 'evergreen-ui';
import DashboardPage from '../../../components/DashboardPage';
import getCatalogItems from '../../../api/getCatalogItems';
import OverlaySpinner from '../../../components/OverlaySpinner';
import ItemsGrid from './ItemsGrid';
import styles from './styles.module.css';
import Results from './Results';

const Sandbox = ({ pageName }) => {
    const [merchantItems, setMerchantItems] = useState([]);
    const [selectedItemsCount, setSelectedItemsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationResults, setSimulationResults] = useState(null);
    const isSimulateDisabled = selectedItemsCount === 0 || isSimulating;

    useEffect(async () => {
        try {
            setIsLoading(true);
            const { catalogItems } = await getCatalogItems();

            setMerchantItems(catalogItems);
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleItemsChange = (items) => {
        setSelectedItemsCount(items.length);
    };

    const handleSimulateClick = async (e) => {
        e.preventDefault();

        try {
            setIsSimulating(true);
            const { catalogItems } = await getCatalogItems();

            setSimulationResults(catalogItems.slice(0, 3));
        } catch {
        } finally {
            setIsSimulating(false);
        }
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

    const renderContent = () => {
        if (merchantItems.length === 0) {
            return (
                <EmptyState
                    background={null}
                    title="No items found"
                    description="It seems like we couldn't find any items tied to your account. Start by adding items in your Square dashboard!"
                    orientation="vertical"
                    icon={<ShopIcon color="#C1C4D6" size={64} />}
                    iconBgColor="#EDEFF5"
                    className={styles.emptyState}
                />
            );
        }

        if (simulationResults) {
            return <Results />;
        }

        return <ItemsGrid items={merchantItems} onChange={handleItemsChange} />;
    };

    return (
        <DashboardPage
            heading={pageName}
            subheading="Select items below to simulate and preview what items could be recommended to customers"
            sideElement={simulateButton}
        >
            <section className={styles.container}>{renderContent()}</section>
            <OverlaySpinner isShown={isLoading} />
        </DashboardPage>
    );
};

Sandbox.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Sandbox;
