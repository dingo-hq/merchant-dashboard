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
    totalTimesRecommended: 'Total recommendations given',
};

const StatsCardList = ({ data }) => {
    return (
        <ul className={styles.list}>
            <StatsCard
                number={data?.totalTimesRecommended}
                label={labels.totalTimesRecommended}
                icon={hashtagIcon}
            />
            <StatsCard
                number={data?.totalTimesOrderedByRecommended}
                label={labels.totalTimesOrderedByRecommended}
                icon={boxIcon}
            />
            <StatsCard
                number={data?.orderedByRecommendedRate}
                label={labels.orderedByRecommendedRate}
                icon={handshakeIcon}
            />
            <StatsCard
                number={data?.linkClickThroughRate}
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
