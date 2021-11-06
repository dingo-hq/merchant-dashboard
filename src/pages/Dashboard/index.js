import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import styles from './styles.module.css';
import Statistics from './Statistics';
import Settings from './Settings';
import RecommendationInventory from './RecommendationInventory';

const Dashboard = () => {
    return (
        <section className={styles.container}>
            <Navigation />
            <Routes>
                <Route path="/" element={<Navigate to="stats" />} />
                <Route path="stats" element={<Statistics />} />
                <Route path="settings" element={<Settings />} />
                <Route
                    path="recommendation-inventory"
                    element={<RecommendationInventory />}
                />
            </Routes>
        </section>
    );
};

export default Dashboard;
