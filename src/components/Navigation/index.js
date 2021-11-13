import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LogOutIcon, Button } from 'evergreen-ui';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import { APP_LOGOUT_URL } from '../../constants';
import styles from './styles.module.css';

const Navigation = ({ navItems, showLogOut }) => {
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;

    return (
        <nav className={styles.nav}>
            <img
                className={styles.logo}
                src={logo}
                onClick={() => {
                    window.location.href = '/';
                }}
            />
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
                            history.push(path);
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </ul>
            {showLogOut && (
                <Button
                    iconBefore={LogOutIcon}
                    appearance="minimal"
                    size="large"
                    className={styles.item}
                    onClick={() => {
                        window.location.href = APP_LOGOUT_URL;
                    }}
                >
                    Log out
                </Button>
            )}
        </nav>
    );
};

Navigation.propTypes = {
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.element.isRequired,
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }),
    ),
    showLogOut: PropTypes.bool,
};

Navigation.defaultProps = {
    navItems: [],
    showLogOut: true,
};

export default Navigation;
