import { TextInputField } from 'evergreen-ui';
import React, { useState } from 'react';
import DashboardPage from '../../../components/DashboardPage';
import Setting from '../../../components/Setting';
import styles from './styles.module.css';

const ENABLE_RECOMMENDATIONS = 'enableRecommendations';

const orderedSettings = [
    {
        name: ENABLE_RECOMMENDATIONS,
        label: 'Send item recommendations after a customer makes a purchase',
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
        <DashboardPage heading="Settings">
            <ul className={styles.container}>
                <li>
                    <TextInputField
                        label="Promotional discount (%)"
                        description="The value of the promotion code that appears after the user submits a recommendation"
                        type="number"
                        min={0}
                    />
                </li>
                {orderedSettings.map(({ name, label }) => (
                    <Setting
                        key={name}
                        checked={settings[name]}
                        name={name}
                        label={label}
                        onChange={handleSettingChange}
                    />
                ))}
            </ul>
        </DashboardPage>
    );
};

export default Settings;
