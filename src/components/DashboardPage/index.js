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
            <div className={styles.contentContainer}>
                <header className={styles.header}>
                    <section className={styles.headings}>
                        <h1 className={styles.heading}>{heading}</h1>
                        <p className={styles.subheading}>{subheading}</p>
                    </section>
                    {sideElement}
                </header>
                <section className={className}>{children}</section>
            </div>
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
