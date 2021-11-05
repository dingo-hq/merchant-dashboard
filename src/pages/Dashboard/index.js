import React from 'react';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import styles from './styles.module.css';

const Dashboard = () => {
    return (
        <section className={styles.container}>
            <Sidebar />
            <Main />
        </section>
    );
};

export default Dashboard;
