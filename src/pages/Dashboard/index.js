import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TimelineLineChartIcon, ThListIcon, CogIcon } from 'evergreen-ui';
import Navigation from '../../components/Navigation';
import styles from './styles.module.css';
import Statistics from './Statistics';
import Settings from './Settings';
import RecommendationInventory from './RecommendationInventory';

const navItems = [
    {
        icon: TimelineLineChartIcon,
        path: '/dashboard/stats',
        label: 'Statistics',
    },
    {
        icon: ThListIcon,
        path: '/dashboard/recommendation-inventory',
        label: 'Recommendation Inventory',
    },
    {
        icon: CogIcon,
        path: '/dashboard/settings',
        label: 'Settings',
    },
];

const Dashboard = () => {
    return (
        <section className={styles.container}>
            <Navigation navItems={navItems} />
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
