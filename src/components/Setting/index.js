import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'evergreen-ui';
import styles from './styles.module.css';

const Setting = ({ name, label, checked, onChange }) => {
    return (
        <li className={styles.setting}>
            <Switch
                checked={checked}
                onChange={(e) => onChange(e.target.checked, name)}
                height={24}
            />
            <span className={styles.label}>{label}</span>
        </li>
    );
};

Setting.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Setting;
