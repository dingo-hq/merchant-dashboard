import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
    TimelineLineChartIcon,
    ThListIcon,
    CogIcon,
    HelperManagementIcon,
} from 'evergreen-ui';
import Navigation from '../../components/Navigation';
import ProtectedRoute from '../../components/ProtectedRoute';
import styles from './styles.module.css';
import Statistics from './Statistics';
import Settings from './Settings';
import RecommendationCatalog from './RecommendationCatalog';
import Sandbox from './Sandbox';

const BASE_PATH = '/dashboard';

const dashboardItems = [
    {
        icon: TimelineLineChartIcon,
        path: `${BASE_PATH}/stats`,
        label: 'Statistics',
        component: Statistics,
    },
    {
        icon: ThListIcon,
        path: `${BASE_PATH}/catalog`,
        label: 'Recommendation Catalog',
        component: RecommendationCatalog,
    },
    {
        icon: HelperManagementIcon,
        path: `${BASE_PATH}/sandbox`,
        label: 'Sandbox',
        component: Sandbox,
    },
    {
        icon: CogIcon,
        path: `${BASE_PATH}/settings`,
        label: 'Settings',
        component: Settings,
    },
];

const Dashboard = () => {
    return (
        <section className={styles.container}>
            <Navigation dashboardItems={dashboardItems} />
            <Route exact path={BASE_PATH}>
                <Redirect to={`${BASE_PATH}/stats`} />
            </Route>
            {dashboardItems.map(({ path, label, component }) => (
                <ProtectedRoute
                    exact
                    key={label}
                    path={path}
                    Component={component}
                    name={label}
                />
            ))}
        </section>
    );
};

export default Dashboard;
