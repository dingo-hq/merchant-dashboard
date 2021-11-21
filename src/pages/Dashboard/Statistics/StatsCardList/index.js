import React from 'react';
import handshakeIcon from '../../../../assets/handshake.svg';
import clicksIcon from '../../../../assets/clicks.svg';
import boxIcon from '../../../../assets/box.svg';
import hashtagIcon from '../../../../assets/hashtag.svg';
import StatsCard from './StatsCard';
import styles from './styles.module.css';

const StatsCardList = () => {
    return (
        <ul className={styles.list}>
            <StatsCard
                number={100}
                label="Total recommendations given"
                icon={hashtagIcon}
            />
            <StatsCard
                number={100}
                label="Total promotions redeemed"
                icon={boxIcon}
            />
            <StatsCard
                number={100}
                label="Promotion redemption rate"
                icon={handshakeIcon}
            />
            <StatsCard
                number={100}
                label="Recommendation link click through rate"
                icon={clicksIcon}
            />
        </ul>
    );
};

export default StatsCardList;
