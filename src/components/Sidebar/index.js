import React from 'react';
import dingoLogo from '../../assets/dingo.svg';
import styles from './styles.module.css';

const Sidebar = () => {
    return (
        <nav className={styles.nav}>
            <img className={styles.logo} src={dingoLogo} />
        </nav>
    );
};

export default Sidebar;
