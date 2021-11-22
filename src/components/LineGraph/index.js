import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import { EmptyState, ShopIcon } from 'evergreen-ui';
import transformDataForLineGraph from '../../utils/transformDataForLineGraph';
import styles from './styles.module.css';

const LineGraph = ({ trendData }) => {
    console.log('got this trend data', trendData);
    if (!trendData) return null;

    const transformedData = transformDataForLineGraph(trendData);
    console.log('using this transformed data', transformedData);

    const renderContent = () => {
        if (trendData.length === 0) {
            return (
                <EmptyState
                    background={null}
                    title="No data found"
                    orientation="vertical"
                    icon={<ShopIcon color="#C1C4D6" />}
                    iconBgColor="#EDEFF5"
                    description="We currently don't have enough data to display here, come back later!"
                />
            );
        }

        return (
            <ResponsiveLine
                data={[transformedData]}
                margin={{ top: 24, right: 32, bottom: 48, left: 48 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                curve="cardinal"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'days',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                pointSize={10}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                theme={{ fontFamily: 'Sharp Grotesk' }}
                motionConfig="gentle"
            />
        );
    };

    return <section className={styles.graph}>{renderContent()}</section>;
};

LineGraph.propTypes = {
    trendData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LineGraph;
