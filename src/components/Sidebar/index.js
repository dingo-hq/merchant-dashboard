import React from 'react';
import {
    IconButton,
    CogIcon,
    LogOutIcon,
    GridViewIcon,
    Tooltip,
    Position,
} from 'evergreen-ui';
import dingoLogo from '../../assets/dingo.svg';
import styles from './styles.module.css';

const Sidebar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.mainActions}>
                <img className={styles.logo} src={dingoLogo} />
                <ul className={styles.navItems}>
                    <li>
                        <Tooltip content="Dashboard" position={Position.RIGHT}>
                            <IconButton
                                icon={GridViewIcon}
                                appearance="minimal"
                                size="large"
                            />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Settings" position={Position.RIGHT}>
                            <IconButton
                                icon={CogIcon}
                                appearance="minimal"
                                size="large"
                            />
                        </Tooltip>
                    </li>
                </ul>
            </div>
            <Tooltip content="Log out" position={Position.RIGHT}>
                <IconButton
                    icon={LogOutIcon}
                    appearance="minimal"
                    size="large"
                />
            </Tooltip>
        </nav>
    );
};

export default Sidebar;
