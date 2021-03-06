import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'evergreen-ui';
import styles from './styles.module.css';

const Toggle = ({ name, label, note, checked, onChange, disabled, intent }) => {
    return (
        <li className={styles.container}>
            <Switch
                checked={checked}
                onChange={(e) => onChange(e.target.checked, name)}
                height={24}
                disabled={disabled}
                className={intent === 'danger' && styles.danger}
            />
            <div className={styles.content}>
                <span className={styles.label}>{label}</span>
                {note && <span className={styles.note}>{note}</span>}
            </div>
        </li>
    );
};

Toggle.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    note: PropTypes.string,
    disabled: PropTypes.bool,
    intent: PropTypes.string,
};

Toggle.defaultProps = {
    note: null,
    disabled: false,
    intent: null,
};

export default Toggle;
