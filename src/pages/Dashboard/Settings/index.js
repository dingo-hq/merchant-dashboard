import { TextInputField } from 'evergreen-ui';
import React, { useState } from 'react';
import DashboardPage from '../../../components/DashboardPage';
import Toggle from '../../../components/Toggle';
import styles from './styles.module.css';

const ENABLE_RECOMMENDATIONS = 'enableRecommendations';

const toggles = [
    {
        name: ENABLE_RECOMMENDATIONS,
        label: 'Enable Dingo',
        note: 'Turning this OFF means customers will no longer receive recommendation links following a purchase.',
    },
];

const initialSettings = {
    [ENABLE_RECOMMENDATIONS]: true,
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
                {toggles.map(({ name, label, note }) => (
                    <Toggle
                        key={name}
                        checked={settings[name]}
                        name={name}
                        label={label}
                        note={note}
                        onChange={handleSettingChange}
                    />
                ))}
            </ul>
            <div className={styles.right} />
        </DashboardPage>
    );
};

export default Settings;
