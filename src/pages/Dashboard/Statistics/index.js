import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../../components/Section';
import StatsCardList from '../../../components/Main/StatsCardList';
import styles from './styles.module.css';

const Statistics = (props) => {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Statistics</h1>
            <Section title="Today's numbers">
                <StatsCardList />
            </Section>
        </main>
    );
};

Statistics.propTypes = {};

export default Statistics;
