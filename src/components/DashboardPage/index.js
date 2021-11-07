import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const DashboardPage = ({ children, heading, subheading, className }) => {
    return (
        <main className={styles.page}>
            <h1 className={styles.heading}>{heading}</h1>
            <h2 className={styles.subheading}>{subheading}</h2>
            <section className={className}>{children}</section>
        </main>
    );
};

DashboardPage.propTypes = {
    children: PropTypes.element.isRequired,
    heading: PropTypes.string.isRequired,
    subheading: PropTypes.string,
    className: PropTypes.string,
};

DashboardPage.defaultProps = {
    subheading: null,
    className: null,
};

export default DashboardPage;
