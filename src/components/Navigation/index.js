import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    CogIcon,
    LogOutIcon,
    ThListIcon,
    TimelineLineChartIcon,
    Button,
} from 'evergreen-ui';
import classNames from 'classnames';
import logo from '../../assets/logo.png';
import styles from './styles.module.css';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

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

    return (
        <nav className={styles.nav}>
            <img className={styles.logo} src={logo} />
            <ul className={styles.navItems}>
                {navItems.map(({ icon, path, label }) => (
                    <Button
                        size="large"
                        appearance="minimal"
                        className={classNames(
                            styles.item,
                            pathname === path && styles.active,
                        )}
                        key={path}
                        iconBefore={icon}
                        onClick={() => {
                            navigate(path);
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </ul>
            <Button
                iconBefore={LogOutIcon}
                appearance="minimal"
                size="large"
                className={styles.item}
            >
                Log out
            </Button>
        </nav>
    );
};

export default Navigation;
