import React from 'react';
import Section from '../Section';
import StatsCardList from './StatsCardList';
import styles from './styles.module.css';

const Main = () => {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Dashboard</h1>
            <Section title="Today's numbers">
                <StatsCardList />
            </Section>
        </main>
    );
};

export default Main;
