import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    EmptyState,
    PlayIcon,
    ResetIcon,
    ShopIcon,
} from 'evergreen-ui';
import DashboardPage from '../../../components/DashboardPage';
import getCatalogItems from '../../../api/getCatalogItems';
import OverlaySpinner from '../../../components/OverlaySpinner';
import simulateRecommendations from '../../../api/simulateRecommendations';
import ItemsGrid from './ItemsGrid';
import styles from './styles.module.css';
import Results from './Results';

const Sandbox = ({ pageName }) => {
    const [merchantItems, setMerchantItems] = useState([]);
    const [selectedItemsCount, setSelectedItemsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationResults, setSimulationResults] = useState(null);
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const isSimulateDisabled = selectedItemsCount === 0 || isSimulating;

    const pageSubheading = simulationResults
        ? 'These are your potential recommended items based on the items you selected'
        : 'Select items below to simulate and preview what items could be recommended to customers';

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

    const handleItemsChange = (itemIds) => {
        setSelectedItemsCount(itemIds.length);
        setSelectedItemIds(itemIds);
    };

    const handleSimulateClick = async (e) => {
        e.preventDefault();

        try {
            setIsSimulating(true);
            const { data } = await simulateRecommendations(selectedItemIds);
            const { recommendations } = data;

            setSimulationResults(recommendations.slice(0, 4));
        } catch {
        } finally {
            setIsSimulating(false);
        }
    };

    const handleResetClick = (e) => {
        e.preventDefault();

        setSimulationResults(null);
    };

    const simulateButton = (
        <Button
            appearance="primary"
            size="large"
            disabled={isSimulateDisabled}
            className={styles.simulate}
            onClick={handleSimulateClick}
            isLoading={isSimulating}
            iconBefore={PlayIcon}
        >
            Simulate {selectedItemsCount} selected{' '}
            {selectedItemsCount === 1 ? 'item' : 'items'}
        </Button>
    );

    const resetButton = (
        <Button
            appearance="primary"
            intent="danger"
            size="large"
            className={styles.reset}
            onClick={handleResetClick}
            iconBefore={ResetIcon}
        >
            Start over
        </Button>
    );

    const actionButton = simulationResults ? resetButton : simulateButton;

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
            console.log('Got simulation results', simulationResults);
            return <Results results={simulationResults} />;
        }

        return <ItemsGrid items={merchantItems} onChange={handleItemsChange} />;
    };

    return (
        <DashboardPage
            heading={pageName}
            subheading={pageSubheading}
            sideElement={actionButton}
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
