import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const DashboardPage = ({
    children,
    heading,
    subheading,
    className,
    sideElement,
}) => {
    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <section className={styles.headings}>
                    <h1 className={styles.heading}>{heading}</h1>
                    <h2 className={styles.subheading}>{subheading}</h2>
                </section>
                {sideElement}
            </header>
            <section className={className}>{children}</section>
        </main>
    );
};

DashboardPage.propTypes = {
    children: PropTypes.element.isRequired,
    heading: PropTypes.string.isRequired,
    subheading: PropTypes.string,
    className: PropTypes.string,
    sideElement: PropTypes.element,
};

DashboardPage.defaultProps = {
    subheading: null,
    className: null,
    sideElement: null,
};

export default DashboardPage;
