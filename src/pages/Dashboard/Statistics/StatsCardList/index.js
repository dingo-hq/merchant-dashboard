import React from 'react';
import PropTypes from 'prop-types';
import handshakeIcon from '../../../../assets/handshake.svg';
import clicksIcon from '../../../../assets/clicks.svg';
import boxIcon from '../../../../assets/box.svg';
import hashtagIcon from '../../../../assets/hashtag.svg';
import StatsCard from './StatsCard';
import styles from './styles.module.css';

const labels = {
    linkClickThroughRate: 'Recommendation link click through rate',
    orderedByRecommendedRate: 'Promotion redemption rate',
    totalTimesOrderedByRecommended: 'Total promotions redeemed',
    totalRecommendationsSent: 'Total recommendation links sent',
};

const StatsCardList = ({ data }) => {
    return (
        <ul className={styles.list}>
            <StatsCard
                number={data?.totalRecommendationsSent}
                label={labels.totalRecommendationsSent}
                icon={hashtagIcon}
            />
            <StatsCard
                number={data?.totalTimesOrderedByRecommended}
                label={labels.totalTimesOrderedByRecommended}
                icon={boxIcon}
            />
            <StatsCard
                number={
                    data?.orderedByRecommendedRate &&
                    parseFloat(data?.orderedByRecommendedRate).toFixed(2)
                }
                label={labels.orderedByRecommendedRate}
                icon={handshakeIcon}
            />
            <StatsCard
                number={
                    data?.linkClickThroughRate &&
                    parseFloat(data?.linkClickThroughRate).toFixed(2)
                }
                label={labels.linkClickThroughRate}
                icon={clicksIcon}
            />
        </ul>
    );
};

StatsCardList.propTypes = {
    data: PropTypes.object.isRequired,
};

export default StatsCardList;
