import React from 'react';
import PropTypes from 'prop-types';
import { Table, IconButton, TrashIcon } from 'evergreen-ui';
import DashboardPage from '../../../components/DashboardPage';
import styles from './styles.module.css';

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
                    <Table.Row>
                        <Table.TextCell>Matcha Milk Tea</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.Cell justifyContent="flex-end">
                            <IconButton
                                icon={TrashIcon}
                                appearance="minimal"
                                intent="danger"
                            />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextCell>Thai Milk Tea</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.Cell justifyContent="flex-end">
                            <IconButton
                                icon={TrashIcon}
                                appearance="minimal"
                                intent="danger"
                            />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextCell>Horchata Milk Tea</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.Cell justifyContent="flex-end">
                            <IconButton
                                icon={TrashIcon}
                                appearance="minimal"
                                intent="danger"
                            />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextCell>Panda Milk Tea</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.Cell justifyContent="flex-end">
                            <IconButton
                                icon={TrashIcon}
                                appearance="minimal"
                                intent="danger"
                            />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </DashboardPage>
    );
};

RecommendationInventory.propTypes = {};

export default RecommendationInventory;
