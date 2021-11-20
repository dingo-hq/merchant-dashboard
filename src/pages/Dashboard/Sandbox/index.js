import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DashboardPage from '../../../components/DashboardPage';
import getCatalogItems from '../../../api/getCatalogItems';
import ItemsList from './ItemsList';
import ItemsSection from './ItemsSection';

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
            <DragDropContext>
                <ItemsSection items={recommendedItems} />
            </DragDropContext>
        </DashboardPage>
    );
};

Sandbox.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Sandbox;
