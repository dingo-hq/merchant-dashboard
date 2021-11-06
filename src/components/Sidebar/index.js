import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IconButton,
    CogIcon,
    LogOutIcon,
    GridViewIcon,
    Tooltip,
    Position,
} from 'evergreen-ui';
import dingoLogo from '../../assets/dingo.png';
import styles from './styles.module.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <nav className={styles.nav}>
            <div className={styles.mainActions}>
                <img className={styles.logo} src={dingoLogo} />
                <ul className={styles.navItems}>
                    <li>
                        <Tooltip content="Statistics" position={Position.RIGHT}>
                            <IconButton
                                icon={GridViewIcon}
                                appearance="minimal"
                                size="large"
                                onClick={() => {
                                    navigate('/dashboard/stats');
                                }}
                            />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Settings" position={Position.RIGHT}>
                            <IconButton
                                icon={CogIcon}
                                appearance="minimal"
                                size="large"
                                onClick={() => {
                                    navigate('/dashboard/settings');
                                }}
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
