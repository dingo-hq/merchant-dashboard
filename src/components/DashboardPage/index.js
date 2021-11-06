import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const DashboardPage = ({ children, heading }) => {
    return (
        <main className={styles.page}>
            <h1 className={styles.heading}>{heading}</h1>
            {children}
        </main>
    );
};

DashboardPage.propTypes = {
    children: PropTypes.element.isRequired,
    heading: PropTypes.string.isRequired,
};

export default DashboardPage;
