import React from 'react';
import { StatusIndicator } from 'evergreen-ui';
import Section from '../../../components/Section';
import StatsCardList from '../../../components/StatsCardList';
import LineGraph from '../../../components/LineGraph';
import DashboardPage from '../../../components/DashboardPage';
import styles from './styles.module.css';

const Statistics = (props) => {
    return (
        <DashboardPage
            heading="Statistics"
            subheading="Take a peek at some numbers and see how you're doing at a quick glance"
            sideElement={
                <StatusIndicator color="success" className={styles.status}>
                    Data is updated every 30 seconds
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

Statistics.propTypes = {};

export default Statistics;
