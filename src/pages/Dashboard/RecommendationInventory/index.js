import React from 'react';
import { Table, IconButton, TrashIcon } from 'evergreen-ui';
import DashboardPage from '../../../components/DashboardPage';
import styles from './styles.module.css';

const data = [
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

const RecommendationInventory = (props) => {
    return (
        <DashboardPage heading="Recommendation Inventory">
            <Table className={styles.table}>
                <Table.Head>
                    <Table.SearchHeaderCell />
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
                    {data.map(({ item, recommendedCount, selectedCount }) => (
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
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </DashboardPage>
    );
};

RecommendationInventory.propTypes = {};

export default RecommendationInventory;
