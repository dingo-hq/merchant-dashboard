import React, { useState, useMemo, useEffect } from 'react';
import {
    Table,
    Dialog,
    toaster,
    EmptyState,
    SearchIcon,
    InboxIcon,
    Spinner,
    Switch,
} from 'evergreen-ui';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import DashboardPage from '../../../components/DashboardPage';
import getCatalogItems from '../../../api/getCatalogItems';
import updateCatalogItem from '../../../api/updateCatalogItem';
import styles from './styles.module.css';

const RecommendationCatalog = ({ pageName }) => {
    const [itemToBeEnabled, setItemToBeEnabled] = useState(null);
    const [itemToBeDisabled, setItemToBeDisabled] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [isToggling, setIsToggling] = useState(false);
    const [itemEnabled, setItemEnabled] = useState({});

    const fuse = new Fuse(items, {
        threshold: 0.25,
        keys: ['name'],
    });

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

    const handleToggleClick = (e, item) => {
        e.preventDefault();

        if (itemEnabled[item.id]) {
            setItemToBeDisabled(item);
        } else {
            setItemToBeEnabled(item);
        }
    };

    const resetToggledItem = (enabled) => {
        if (enabled) {
            setItemToBeEnabled(null);
        } else {
            setItemToBeDisabled(null);
        }
    };

    const confirmToggleItem = async ({ id, name }, enabled) => {
        setIsToggling(true);

        const successMessage = enabled
            ? `${name} was successfully enabled and will be available for recommendations.`
            : `${name} was successfully disabled and will not be recommended.`;

        const errorMessage = enabled
            ? `Sorry, something went wrong when trying to enable ${name}!`
            : `Sorry, something went wrong when trying to disable ${name}!`;

        try {
            await updateCatalogItem(id, { enabled });

            toaster.closeAll();
            toaster.success(successMessage);
            setItemEnabled((prevItemEnabled) => ({
                ...prevItemEnabled,
                [id]: enabled,
            }));

            resetToggledItem(enabled);
        } catch (error) {
            toaster.closeAll();
            toaster.danger(errorMessage);
            resetToggledItem(enabled);
        } finally {
            setIsToggling(false);
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
            ({
                squareId,
                name,
                enabled,
                timesRecommended,
                timesOrderedByRecommended,
            }) => (
                <Table.Row key={squareId}>
                    <Table.TextCell>{name}</Table.TextCell>
                    <Table.TextCell isNumber>{timesRecommended}</Table.TextCell>
                    <Table.TextCell isNumber>
                        {timesOrderedByRecommended}
                    </Table.TextCell>
                    <Table.Cell justifyContent="flex-end">
                        <Switch
                            checked={itemEnabled[squareId]}
                            onClick={(e) =>
                                handleToggleClick(e, {
                                    id: squareId,
                                    name,
                                    currentEnabled: enabled,
                                })
                            }
                        />
                    </Table.Cell>
                </Table.Row>
            ),
        );
    };

    return (
        <DashboardPage
            heading={pageName}
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
                        Number of Times Ordered by Recommended
                    </Table.HeaderCell>
                    <Table.HeaderCell justifyContent="flex-end">
                        Recommendations Enabled
                    </Table.HeaderCell>
                </Table.Head>
                <Table.Body>{renderTableBody()}</Table.Body>
            </Table>
            <Dialog
                isShown={itemToBeDisabled}
                title="Disable Item Recommendation"
                onCloseComplete={() => setItemToBeDisabled(null)}
                onConfirm={() => confirmToggleItem(itemToBeDisabled, false)}
                confirmLabel="Disable"
                intent="danger"
                isConfirmLoading={isToggling}
            >
                Are you sure you want to disable recommendations for{' '}
                <strong>{itemToBeDisabled?.name}</strong>?
            </Dialog>
            <Dialog
                isShown={itemToBeEnabled}
                title="Enable Item Recommendation"
                onCloseComplete={() => setItemToBeEnabled(null)}
                onConfirm={() => confirmToggleItem(itemToBeEnabled, true)}
                confirmLabel="Enable"
                isConfirmLoading={isToggling}
            >
                Are you sure you want to enable recommendations for{' '}
                <strong>{itemToBeEnabled?.name}</strong>?
            </Dialog>
        </DashboardPage>
    );
};

RecommendationCatalog.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default RecommendationCatalog;
