import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const missingNumber = '--';

const StatsCard = ({ number, label, icon }) => {
    return (
        <li className={styles.card}>
            <img className={styles.icon} src={icon} />
            <div className={styles.metadata}>
                <p className={styles.label}>{label}</p>
                <span className={styles.number}>{number}</span>
            </div>
        </li>
    );
};

StatsCard.propTypes = {
    number: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default StatsCard;
