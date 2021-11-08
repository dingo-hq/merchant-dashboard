import { TextInputField } from 'evergreen-ui';
import React, { useState } from 'react';
import DashboardPage from '../../../components/DashboardPage';
import Toggle from '../../../components/Toggle';
import styles from './styles.module.css';

const PAUSE_DINGO = 'pauseDingo';

const toggles = [
    {
        name: PAUSE_DINGO,
        label: 'Pause Dingo',
        note: 'Turning this ON means customers will stop receiving recommendation links following a purchase until this is turned back OFF.',
    },
];

const initialSettings = {
    [PAUSE_DINGO]: false,
};

const Settings = (props) => {
    const [settings, setSettings] = useState(initialSettings);

    const handleSettingChange = (checked, setting) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [setting]: checked,
        }));
    };

    return (
        <DashboardPage
            heading="Settings"
            subheading="Make changes to how Dingo works with your current business and customers"
            className={styles.page}
        >
            <ul className={styles.container}>
                <li>
                    <TextInputField
                        label="Promotional discount (%)"
                        description="The promotion code value that appears after a user selects and submits a recommended item from a recommendation link"
                        type="number"
                        min={0}
                        max={100}
                    />
                </li>
                {toggles.map(({ name, label, note, intent }) => (
                    <Toggle
                        key={name}
                        checked={settings[name]}
                        name={name}
                        label={label}
                        note={note}
                        onChange={handleSettingChange}
                        className={styles.toggle}
                    />
                ))}
            </ul>
            <div className={styles.right} />
        </DashboardPage>
    );
};

export default Settings;
