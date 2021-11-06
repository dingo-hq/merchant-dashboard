import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'evergreen-ui';
import DashboardPage from '../../../components/DashboardPage';
import styles from './styles.module.css';

const RecommendationInventory = (props) => {
    return (
        <DashboardPage heading="Recommendation Inventory">
            <Table className={styles.table}>
                <Table.Head>
                    <Table.SearchHeaderCell />
                    <Table.TextHeaderCell>
                        Number of Times Recommended
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Number of Times Selected
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.TextCell>Matcha Milk Tea</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextCell>Thai Milk Tea</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextCell>Horchata Milk Tea</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.TextCell>Panda Milk Tea</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                        <Table.TextCell isNumber>100</Table.TextCell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </DashboardPage>
    );
};

RecommendationInventory.propTypes = {};

export default RecommendationInventory;
