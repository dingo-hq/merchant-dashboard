import React from 'react';
import Section from '../../../components/Section';
import StatsCardList from '../../../components/Main/StatsCardList';
import LineGraph from '../../../components/LineGraph';
import DashboardPage from '../../../components/DashboardPage';
import styles from './styles.module.css';

const Statistics = (props) => {
    return (
        <DashboardPage>
            <h1 className={styles.title}>Statistics</h1>
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
