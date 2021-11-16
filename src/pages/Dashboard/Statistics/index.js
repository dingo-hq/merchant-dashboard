import React from 'react';
import { StatusIndicator } from 'evergreen-ui';
import PropTypes from 'prop-types';
import Section from '../../../components/Section';
import StatsCardList from '../../../components/StatsCardList';
import LineGraph from '../../../components/LineGraph';
import DashboardPage from '../../../components/DashboardPage';
import styles from './styles.module.css';

const Statistics = ({ pageName }) => {
    const statusContent = {
        success: {
            color: 'success',
            text: 'Updated every 30 seconds',
        },
        error: {
            color: 'danger',
            text: 'Failed to update at this time',
        },
    };

    return (
        <DashboardPage
            heading={pageName}
            subheading="Take a peek at some numbers and see how you're doing at a quick glance"
            sideElement={
                <StatusIndicator
                    color={statusContent.success.color}
                    className={styles.status}
                >
                    {statusContent.success.text}
                </StatusIndicator>
            }
        >
            <Section title="Today's numbers">
                <StatsCardList />
            </Section>
            <Section title="Trends">
                <LineGraph />
            </Section>
        </DashboardPage>
    );
};

Statistics.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Statistics;
