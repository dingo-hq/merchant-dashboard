import React from 'react';
import Section from '../../../components/Section';
import StatsCardList from '../../../components/StatsCardList';
import LineGraph from '../../../components/LineGraph';
import DashboardPage from '../../../components/DashboardPage';

const Statistics = (props) => {
    return (
        <DashboardPage
            heading="Statistics"
            subheading="See how you're doing at a quick glance"
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
