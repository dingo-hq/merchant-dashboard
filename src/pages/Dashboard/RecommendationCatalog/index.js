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
    Spinner,
    Switch,
} from 'evergreen-ui';
import Fuse from 'fuse.js';
import DashboardPage from '../../../components/DashboardPage';
import SearchSelect from '../../../components/SearchSelect';
import getCatalogItems from '../../../api/getCatalogItems';
import updateCatalogItem from '../../../api/updateCatalogItem';
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
    const [itemToBeDisabled, setItemToBeDisabled] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [isDisabling, setIsDisabling] = useState(false);
    const [itemEnabled, setItemEnabled] = useState({});

    const fetchCatalogItems = async () => {
        setIsLoading(true);

        try {
            const { data } = await getCatalogItems();

            setItems(data);
            data.forEach(({ squareId, enabled }) => {
                setItemEnabled((prevItemEnabled) => ({
                    ...prevItemEnabled,
                    [squareId]: enabled,
                }));
            });
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCatalogItems();
    }, []);

    const handleToggleClick = async (id, name) => {
        if (!itemEnabled[id]) {
            setItemEnabled((prevItemEnabled) => ({
                ...prevItemEnabled,
                [id]: true,
            }));

            try {
                await updateCatalogItem(id, { enabled: true });
            } catch (error) {
                toaster.danger(
                    `Sorry, something went wrong when trying to enable ${name}!`,
                );

                setItemEnabled((prevItemEnabled) => ({
                    ...prevItemEnabled,
                    [id]: false,
                }));
            }
        } else {
            setItemToBeDisabled({ id, name });
        }
    };

    const handleDisableItemClick = async ({ id, name }) => {
        setIsDisabling(true);

        try {
            await updateCatalogItem(id, { enabled: false });

            toaster.success(
                `${name} was successfully disabled and will not be recommended.`,
            );
            setItemEnabled((prevItemEnabled) => ({
                ...prevItemEnabled,
                [id]: false,
            }));
        } catch (error) {
            toaster.danger(
                `Sorry, something went wrong when trying to disable ${name}!`,
            );
        } finally {
            setIsDisabling(false);
            setItemToBeDisabled(null);
        }
    };

    const filteredItems = useMemo(
        () =>
            searchValue
                ? fuse.search(searchValue).map(({ item }) => item)
                : items,
        [searchValue, items],
    );

    const renderTableBody = () => {
        if (isLoading) {
            return (
                <section className={styles.loadingContainer}>
                    <Spinner size={64} />
                </section>
            );
        }

        if (items.length === 0) {
            return (
                <EmptyState
                    background="light"
                    title="Your recommendation catalog is empty"
                    orientation="horizontal"
                    icon={<InboxIcon color="#C1C4D6" />}
                    iconBgColor="#EDEFF5"
                    description="Add items from your existing catalog to see them here!"
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
            ({ squareId, name, enabled, recommendedCount, selectedCount }) => (
                <Table.Row key={squareId}>
                    <Table.TextCell>{name}</Table.TextCell>
                    <Table.TextCell isNumber>100</Table.TextCell>
                    <Table.TextCell isNumber>100</Table.TextCell>
                    <Table.Cell justifyContent="flex-end">
                        <Switch
                            checked={itemEnabled[squareId]}
                            onClick={(e) => {
                                e.preventDefault();
                                handleToggleClick(squareId, name);
                            }}
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
                        Recommendations Enabled
                    </Table.HeaderCell>
                </Table.Head>
                <Table.Body>{renderTableBody()}</Table.Body>
            </Table>
            <Dialog
                isShown={!!itemToBeDisabled}
                title="Disable Item Recommendation"
                onCloseComplete={() => setItemToBeDisabled(null)}
                onConfirm={() => handleDisableItemClick(itemToBeDisabled)}
                confirmLabel="Disable"
                intent="danger"
                isConfirmLoading={isDisabling}
            >
                Are you sure you want to disable recommendations for{' '}
                <strong>{itemToBeDisabled?.name}</strong>?
            </Dialog>
        </DashboardPage>
    );
};

RecommendationCatalog.propTypes = {};

export default RecommendationCatalog;
