import React from 'react';
import StatsCardList from './StatsCardList';
import styles from './styles.module.css';

const Main = () => {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Dashboard</h1>
            <StatsCardList />
        </main>
    );
};

export default Main;
