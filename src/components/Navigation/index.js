import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CogIcon, LogOutIcon, GridViewIcon, Button } from 'evergreen-ui';
import logo from '../../assets/logo.png';
import styles from './styles.module.css';

const Navigation = () => {
    const navigate = useNavigate();

    return (
        <nav className={styles.nav}>
            <div className={styles.mainActions}>
                <img className={styles.logo} src={logo} />
                <ul className={styles.navItems}>
                    <li>
                        <Button
                            iconBefore={GridViewIcon}
                            appearance="minimal"
                            size="large"
                            onClick={() => {
                                navigate('/dashboard/stats');
                            }}
                            className={styles.item}
                        >
                            Statistics
                        </Button>
                    </li>
                    <li>
                        <Button
                            iconBefore={CogIcon}
                            appearance="minimal"
                            size="large"
                            onClick={() => {
                                navigate('/dashboard/settings');
                            }}
                            className={styles.item}
                        >
                            Settings
                        </Button>
                    </li>
                </ul>
            </div>
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
