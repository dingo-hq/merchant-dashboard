import { TextInputField } from 'evergreen-ui';
import React, { useState, useEffect } from 'react';
import getMerchantDetails from '../../../api/getMerchantDetails';
import DashboardPage from '../../../components/DashboardPage';
import Toggle from '../../../components/Toggle';
import styles from './styles.module.css';

const PAUSED = 'paused';
const PROMOTIONAL_DISCOUNT_ENABLED = 'promotionalDiscountEnabled';
const PROMOTIONAL_DISCOUNT_NUMBER = 'promotionalDiscountNumber';

const toggles = [
    {
        name: PROMOTIONAL_DISCOUNT_ENABLED,
        label: 'Enable promotional discounts',
        note: 'Control whether or not you want customers to receive promotional codes after submitting a recommended item.',
    },
    {
        name: PAUSED,
        label: 'Pause Dingo',
        note: 'Turning this setting ON means customers will stop receiving recommendation links following a purchase until this setting is turned OFF.',
    },
];

const initialSettings = {
    [PAUSED]: false,
    [PROMOTIONAL_DISCOUNT_ENABLED]: false,
    [PROMOTIONAL_DISCOUNT_NUMBER]: 0,
};

const Settings = (props) => {
    const [settings, setSettings] = useState(initialSettings);

    useEffect(() => {
        const fetchMerchantDetails = async () => {
            try {
                const { data } = await getMerchantDetails();
                const { config } = data;
                setSettings(config);
            } catch (error) {}
        };

        fetchMerchantDetails();
    }, []);

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
                        value={settings[PROMOTIONAL_DISCOUNT_NUMBER]}
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
                        className={styles.toggle}
                    />
                ))}
            </ul>
            <div className={styles.right} />
        </DashboardPage>
    );
};

export default Settings;
