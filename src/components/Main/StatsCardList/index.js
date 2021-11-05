import React from 'react';
import clicksIcon from '../../../assets/clicks.svg';
import starIcon from '../../../assets/star.svg';
import StatsCard from './StatsCard';
import styles from './styles.module.css';

const StatsCardList = () => {
    return (
        <ul className={styles.list}>
            <StatsCard
                number={100}
                label="Number of links clicked"
                icon={clicksIcon}
            />
            <StatsCard
                number={100}
                label="Recommendations given"
                icon={starIcon}
            />
            <StatsCard
                number={100}
                label="Recommendations completed"
                icon={clicksIcon}
            />
            <StatsCard
                number={100}
                label="Recommendations given"
                icon={starIcon}
            />
        </ul>
    );
};

export default StatsCardList;
