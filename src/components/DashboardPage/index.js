import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const DashboardPage = ({ children }) => {
    return <main className={styles.page}>{children}</main>;
};

DashboardPage.propTypes = {
    children: PropTypes.element.isRequired,
};

export default DashboardPage;
