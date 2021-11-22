import React, { useEffect, useState } from 'react';
import { StatusIndicator } from 'evergreen-ui';
import PropTypes from 'prop-types';
import Section from '../../../components/Section';
import LineGraph from '../../../components/LineGraph';
import DashboardPage from '../../../components/DashboardPage';
import getStatistics from '../../../api/getStatistics';
import OverlaySpinner from '../../../components/OverlaySpinner';
import StatsCardList from './StatsCardList';
import styles from './styles.module.css';

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

const Statistics = ({ pageName }) => {
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [trendData, setTrendData] = useState(null);
    const [numbersData, setNumbersData] = useState(null);

    useEffect(async () => {
        try {
            setIsPageLoading(true);
            const { countByDay, numbers } = await getStatistics();

            setTrendData(countByDay);
            setNumbersData(numbers);
        } catch {
        } finally {
            setIsPageLoading(false);
        }
    }, []);

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
            <Section title="Some numbers">
                <StatsCardList data={numbersData} />
            </Section>
            <Section title="Trends">
                <LineGraph trendData={trendData} />
            </Section>
            <OverlaySpinner isShown={isPageLoading} />
        </DashboardPage>
    );
};

Statistics.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Statistics;
