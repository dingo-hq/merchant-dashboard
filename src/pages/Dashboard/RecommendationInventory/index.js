import React, { useState, useMemo } from 'react';
import { Table, IconButton, TrashIcon, Dialog, toaster } from 'evergreen-ui';
import Fuse from 'fuse.js';
import DashboardPage from '../../../components/DashboardPage';
import styles from './styles.module.css';

const inventoryItems = [
    {
        item: 'Matcha Milk Tea',
        recommendedCount: 100,
        selectedCount: 100,
    },
    {
        item: 'Horchata Milk Tea',
        recommendedCount: 100,
        selectedCount: 100,
    },
    {
        item: 'Thai Milk Tea',
        recommendedCount: 100,
        selectedCount: 100,
    },
    {
        item: 'Panda Milk Tea',
        recommendedCount: 100,
        selectedCount: 100,
    },
];

const fuse = new Fuse(inventoryItems, {
    threshold: 0.25,
    keys: ['item'],
});

const RecommendationInventory = (props) => {
    const [itemToBeDeleted, setItemToBeDeleted] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const handleRemove = (item) => {
        // Happy path
        setItemToBeDeleted(null);
        toaster.success(
            `${item} was successfully removed from your recommendation inventory.`,
        );
    };

    const filteredInventoryItems = useMemo(
        () =>
            searchValue
                ? fuse.search(searchValue).map(({ item }) => item)
                : inventoryItems,
        [searchValue],
    );

    return (
        <DashboardPage
            heading="Recommendation Inventory"
            subheading="Items listed here may appear as a recommended item for customers who receive a recommendation link"
        >
            <Table className={styles.table}>
                <Table.Head>
                    <Table.SearchHeaderCell
                        onChange={(value) => setSearchValue(value)}
                        placeholder="Search inventory items"
                    />
                    <Table.HeaderCell>
                        Number of Times Recommended
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Number of Times Selected
                    </Table.HeaderCell>
                    <Table.HeaderCell justifyContent="flex-end">
                        Actions{' '}
                    </Table.HeaderCell>
                </Table.Head>
                <Table.Body>
                    {filteredInventoryItems.map(
                        ({ item, recommendedCount, selectedCount }) => (
                            <Table.Row key={item}>
                                <Table.TextCell>{item}</Table.TextCell>
                                <Table.TextCell isNumber>
                                    {recommendedCount}
                                </Table.TextCell>
                                <Table.TextCell isNumber>
                                    {selectedCount}
                                </Table.TextCell>
                                <Table.Cell justifyContent="flex-end">
                                    <IconButton
                                        icon={TrashIcon}
                                        appearance="minimal"
                                        intent="danger"
                                        onClick={() => setItemToBeDeleted(item)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ),
                    )}
                </Table.Body>
            </Table>
            <Dialog
                isShown={!!itemToBeDeleted}
                title="Remove item"
                onCloseComplete={() => setItemToBeDeleted(null)}
                onConfirm={() => handleRemove(itemToBeDeleted)}
                confirmLabel="Remove"
                intent="danger"
            >
                Are you sure you want to remove{' '}
                <strong>{itemToBeDeleted}</strong> from your recommendation
                inventory?
                <span className={styles.note}>
                    Note: it will still be kept in your original inventory.
                </span>
            </Dialog>
        </DashboardPage>
    );
};

RecommendationInventory.propTypes = {};

export default RecommendationInventory;
