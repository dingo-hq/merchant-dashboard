import { Button, TextInputField, toaster } from 'evergreen-ui';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getMerchantDetails from '../../../api/getMerchantDetails';
import saveSettings from '../../../api/saveSettings';
import DashboardPage from '../../../components/DashboardPage';
import Toggle from '../../../components/Toggle';
import priceTag from '../../../assets/price-tag-circle.svg';
import shoppingsBags from '../../../assets/shopping-bags-circle.svg';
import styles from './styles.module.css';

const PAUSED = 'paused';
const DISCOUNT_ENABLED = 'discountEnabled';
const PROMOTIONAL_DISCOUNT_TYPE = 'promotionalDiscountType';
const LOYALTY_POINTS = 'loyaltyPoints';
const PERCENTAGE_DISCOUNT = 'percentageDiscount';
const PROMOTIONAL_DISCOUNT_DURATION = 'promotionalDiscountDuration';

const promotionalDiscountTypes = {
    LOYALTY: 'LOYALTY',
    PERCENTAGE: 'PERCENTAGE',
};

const toggles = [
    {
        name: DISCOUNT_ENABLED,
        label: 'Enable discounts',
        note: 'Control whether or not you want customers to receive promotional discounts after submitting a recommended item',
    },
    {
        name: PAUSED,
        label: 'Pause Dingo',
        note: 'Turning this setting ON means customers will stop receiving recommendation links following a purchase until this setting is turned OFF',
    },
];

const initialSettings = {
    [PAUSED]: false,
    [DISCOUNT_ENABLED]: false,
    [PROMOTIONAL_DISCOUNT_TYPE]: promotionalDiscountTypes.LOYALTY,
    [LOYALTY_POINTS]: 0,
    [PERCENTAGE_DISCOUNT]: 10,
    [PROMOTIONAL_DISCOUNT_DURATION]: 7,
};

const promotionMethods = [
    {
        label: 'Loyalty Points',
        imageSrc: shoppingsBags,
        type: promotionalDiscountTypes.LOYALTY,
    },
    {
        label: 'Percentage Discount',
        imageSrc: priceTag,
        type: promotionalDiscountTypes.PERCENTAGE,
    },
];

const Settings = ({ pageName }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchMerchantDetails = async () => {
            setIsLoading(true);

            try {
                const { data } = await getMerchantDetails();
                const { config } = data;
                setSettings(config);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };

        fetchMerchantDetails();
    }, []);

    const handleSettingChange = (value, setting) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [setting]: value,
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);

        try {
            await saveSettings(settings);
            toaster.success('Your changes were successfully saved.');
        } catch (error) {
            toaster.danger(
                "Something went wrong, we couldn't save your settings!",
            );
        } finally {
            setIsSaving(false);
        }
    };

    const isDisabled = isLoading || isSaving;

    const percentageDiscountInput = (
        <TextInputField
            label="Percentage discount amount"
            description="The percentage discount that the customer can use when purchasing a recommended item"
            type="number"
            min={0}
            max={100}
            value={settings[PERCENTAGE_DISCOUNT]}
            disabled={isDisabled}
            onChange={(e) =>
                handleSettingChange(
                    parseInt(e.target.value),
                    PERCENTAGE_DISCOUNT,
                )
            }
        />
    );

    const loyaltyPointsInput = (
        <TextInputField
            label="Loyalty point amount"
            description="The amount of loyalty points that the customer can redeem when purchasing a recommended item"
            type="number"
            min={0}
            max={100}
            value={settings[LOYALTY_POINTS]}
            disabled={isDisabled}
            onChange={(e) =>
                handleSettingChange(parseInt(e.target.value), LOYALTY_POINTS)
            }
        />
    );

    const promotionInput =
        settings[PROMOTIONAL_DISCOUNT_TYPE] === promotionalDiscountTypes.LOYALTY
            ? loyaltyPointsInput
            : percentageDiscountInput;

    return (
        <DashboardPage
            heading={pageName}
            subheading="Make changes to how Dingo works with your current business and customers"
            className={styles.page}
        >
            <section>
                <ul className={styles.settings}>
                    <li>
                        <span className={styles.promotionOptionsLabel}>
                            Discount method
                        </span>
                        <span className={styles.promotionOptionsDescription}>
                            When a customer selects a recommended item through a
                            recommendation link, they may receive a percentage
                            discount or loyalty points upon redemption
                        </span>
                        <div className={styles.promotionOptions}>
                            {promotionMethods.map(
                                ({ label, imageSrc, type }) => (
                                    <figure
                                        key={label}
                                        className={classNames(
                                            styles.promotionOption,
                                            !isDisabled &&
                                                settings[
                                                    PROMOTIONAL_DISCOUNT_TYPE
                                                ] === type &&
                                                styles.promotionOptionSelected,
                                            isDisabled &&
                                                styles.promotionOptionDisabled,
                                        )}
                                        onClick={() =>
                                            handleSettingChange(
                                                type,
                                                PROMOTIONAL_DISCOUNT_TYPE,
                                            )
                                        }
                                    >
                                        <img
                                            src={imageSrc}
                                            className={
                                                styles.promotionOptionImage
                                            }
                                        />
                                        <figcaption>{label}</figcaption>
                                    </figure>
                                ),
                            )}
                        </div>
                    </li>
                    <li>{promotionInput}</li>
                    {/* <li>
                        <TextInputField
                            label="Discount duration"
                            description="The amount of time the discount is valid for"
                            type="date"
                            value={settings[PROMOTIONAL_DISCOUNT_NUMBER]}
                            disabled={isLoading || isSaving}
                            onChange={(e) =>
                                handleSettingChange(
                                    parseInt(e.target.value),
                                    PROMOTIONAL_DISCOUNT_NUMBER,
                                )
                            }
                        />
                    </li> */}
                    {toggles.map(({ name, label, note }) => (
                        <Toggle
                            key={name}
                            checked={settings[name]}
                            name={name}
                            label={label}
                            note={note}
                            onChange={handleSettingChange}
                            className={styles.toggle}
                            disabled={isLoading || isSaving}
                        />
                    ))}
                </ul>
                <Button
                    appearance="primary"
                    onClick={handleSave}
                    isLoading={isSaving}
                    disabled={isLoading}
                    size="large"
                >
                    Save
                </Button>
            </section>
        </DashboardPage>
    );
};

Settings.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Settings;
