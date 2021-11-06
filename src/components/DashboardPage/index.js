import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const DashboardPage = ({ children, heading, subheading }) => {
    return (
        <main className={styles.page}>
            <h1 className={styles.heading}>{heading}</h1>
            <h2 className={styles.subheading}>{subheading}</h2>
            {children}
        </main>
    );
};

DashboardPage.propTypes = {
    children: PropTypes.element.isRequired,
    heading: PropTypes.string.isRequired,
    subheading: PropTypes.string,
};

DashboardPage.defaultProps = {
    subheading: null,
};

export default DashboardPage;
