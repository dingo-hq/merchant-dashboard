import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TimelineLineChartIcon, ThListIcon, CogIcon } from 'evergreen-ui';
import Navigation from '../../components/Navigation';
import ProtectedRoute from '../../components/ProtectedRoute';
import styles from './styles.module.css';
import Statistics from './Statistics';
import Settings from './Settings';
import RecommendationCatalog from './RecommendationCatalog';

const BASE_PATH = '/dashboard';

const dashboardItems = [
    {
        icon: TimelineLineChartIcon,
        path: '/dashboard/stats',
        label: 'Statistics',
    },
    {
        icon: ThListIcon,
        path: '/dashboard/catalog',
        label: 'Recommendation Catalog',
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
            <Navigation dashboardItems={dashboardItems} />
            <Route exact path={BASE_PATH}>
                <Redirect to={`${BASE_PATH}/stats`} />
            </Route>
            <ProtectedRoute
                exact
                path={`${BASE_PATH}/stats`}
                component={Statistics}
            />
            <ProtectedRoute
                exact
                path={`${BASE_PATH}/settings`}
                component={Settings}
            />
            <ProtectedRoute
                exact
                path={`${BASE_PATH}/catalog`}
                component={RecommendationCatalog}
            />
        </section>
    );
};

export default Dashboard;
