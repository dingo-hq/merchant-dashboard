import React, { useState, useMemo, useEffect } from 'react';
import {
    Table,
    IconButton,
    TrashIcon,
    Dialog,
    toaster,
    PlusIcon,
    Button,
    EmptyState,
    SearchIcon,
    InboxIcon,
} from 'evergreen-ui';
import Fuse from 'fuse.js';
import DashboardPage from '../../../components/DashboardPage';
import SearchSelect from '../../../components/SearchSelect';
import getCatalogItems from '../../../api/getCatalogItems';
import styles from './styles.module.css';

const items = [
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

const fuse = new Fuse(items, {
    threshold: 0.25,
    keys: ['item'],
});

const RecommendationCatalog = (props) => {
    const [itemToBeDeleted, setItemToBeDeleted] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    useEffect(async () => {
        setIsLoading(true);

        try {
            const catalogItems = await getCatalogItems();
            setItems(catalogItems);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleRemoveItem = (item) => {
        // Happy path
        setItemToBeDeleted(null);
        toaster.success(
            `${item} was successfully removed from your recommendation catalog.`,
        );
    };

    const handleAddItem = () => {};

    const filteredItems = useMemo(
        () =>
            searchValue
                ? fuse.search(searchValue).map(({ item }) => item)
                : items,
        [searchValue],
    );

    const renderTableBody = () => {
        if (items.length === 0) {
            return (
                <EmptyState
                    background="light"
                    title="No items in the recommendation catalog"
                    orientation="horizontal"
                    icon={<InboxIcon color="#C1C4D6" />}
                    iconBgColor="#EDEFF5"
                    description="Looks like your recommendation catalog is empty. Add items to see them here!"
                />
            );
        }

        if (filteredItems.length === 0) {
            return (
                <EmptyState
                    background="light"
                    title={`No items found for "${searchValue}"`}
                    orientation="horizontal"
                    icon={<SearchIcon color="#C1C4D6" />}
                    iconBgColor="#EDEFF5"
                    description="Uh-oh, we had a hard time finding your item, try searching for something else!"
                />
            );
        }

        return filteredItems.map(
            ({ item, recommendedCount, selectedCount }) => (
                <Table.Row key={item}>
                    <Table.TextCell>{item}</Table.TextCell>
                    <Table.TextCell isNumber>{recommendedCount}</Table.TextCell>
                    <Table.TextCell isNumber>{selectedCount}</Table.TextCell>
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
        );
    };

    return (
        <DashboardPage
            heading="Recommendation Catalog"
            subheading="Items listed here may appear as a recommended item for customers who receive a recommendation link"
            sideElement={
                <Button
                    size="large"
                    iconBefore={PlusIcon}
                    onClick={() => setShowAddItemModal(true)}
                    appearance="primary"
                >
                    Add Item
                </Button>
            }
        >
            <Table className={styles.table}>
                <Table.Head>
                    <Table.SearchHeaderCell
                        onChange={(value) => setSearchValue(value)}
                        placeholder="Search catalog items"
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
                <Table.Body>{renderTableBody()}</Table.Body>
            </Table>
            <Dialog
                isShown={!!itemToBeDeleted}
                title="Remove item"
                onCloseComplete={() => setItemToBeDeleted(null)}
                onConfirm={() => handleRemoveItem(itemToBeDeleted)}
                confirmLabel="Remove"
                intent="danger"
            >
                Are you sure you want to remove{' '}
                <strong>{itemToBeDeleted}</strong> from your recommendation
                catalog?
                <span className={styles.note}>
                    Note: it will still be kept in your original catalog.
                </span>
            </Dialog>
            <Dialog
                isShown={showAddItemModal}
                title="Add item"
                onCloseComplete={() => setShowAddItemModal(false)}
                onConfirm={handleAddItem}
                confirmLabel="Submit"
            >
                Add an item from your existing catalog below.
                <SearchSelect
                    className={styles.searchSelect}
                    values={items}
                    searchKey="item"
                    onSelect={(item) => {
                        console.log('Got this item', item);
                        setSelectedItem(item);
                    }}
                />
            </Dialog>
        </DashboardPage>
    );
};

RecommendationCatalog.propTypes = {};

export default RecommendationCatalog;
