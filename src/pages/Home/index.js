import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GridViewIcon, PropertiesIcon, ShopIcon } from 'evergreen-ui';
import classNames from 'classnames';
import Navigation from '../../components/Navigation';
import PrimaryButton from '../../components/PrimaryButton';
import SquareLogo from '../../components/SquareLogo';
import { SQUARE_OAUTH_URL } from '../../constants';
import business from '../../assets/business.svg';
import shoppingBags from '../../assets/shopping-bags.svg';
import priceTag from '../../assets/price-tag.svg';
import cart from '../../assets/cart.svg';
import getMerchantDetails from '../../api/getMerchantDetails';
import isUnauthorized from '../../utils/isUnauthorized';
import styles from './styles.module.css';

const navItems = [
    {
        icon: ShopIcon,
        label: 'How it Works',
    },
    {
        icon: PropertiesIcon,
        label: 'Features',
    },
];

const Home = () => {
    const history = useHistory();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(async () => {
        try {
            await getMerchantDetails();
            setIsAuthenticated(true);
        } catch (error) {
            if (isUnauthorized) {
                setIsAuthenticated(false);
            }
        }
    }, []);

    const defaultCta = {
        onClick: () => {
            window.location.href = SQUARE_OAUTH_URL;
        },
        text: 'Connect with Square',
        iconBefore: SquareLogo,
    };
    const authenticatedCta = {
        onClick: () => {
            history.push('/dashboard');
        },
        text: 'Continue to Dashboard',
        iconBefore: GridViewIcon,
    };

    const cta = isAuthenticated ? authenticatedCta : defaultCta;

    const ctaButton = (
        <PrimaryButton
            onClick={cta.onClick}
            size="large"
            className={styles.connect}
            iconBefore={cta.iconBefore}
        >
            {cta.text}
        </PrimaryButton>
    );

    return (
        <section className={styles.container}>
            <header>
                <Navigation navItems={navItems} showLogOut={isAuthenticated} />
            </header>
            <section className={styles.landing}>
                <div
                    className={classNames(
                        styles.contentContainer,
                        styles.landingContent,
                    )}
                >
                    <div className={styles.statement}>
                        <h1 className={styles.message}>
                            <span className={styles.highlight}>Accelerate</span>{' '}
                            your business and{' '}
                            <span className={styles.highlight}>increase</span>{' '}
                            customer retention.
                        </h1>
                        <p className={styles.description}>
                            Looking to grow your customer base or find ways to
                            keep them coming back? Take control of your business
                            by integrating your Square account with Dingo!
                        </p>
                        {ctaButton}
                    </div>
                    <div className={styles.illustrationContainer}>
                        <img className={styles.illustration} src={business} />
                    </div>
                </div>
            </section>
            <section className={styles.howItWorks}>
                <div
                    className={classNames(
                        styles.contentContainer,
                        styles.howItWorksContent,
                    )}
                >
                    <h2 className={styles.sectionTitle}>How it Works</h2>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <img className={styles.stepImage} src={cart} />
                            <h3 className={styles.stepLabel}>
                                Connect Dingo with your Square account
                            </h3>
                            <p className={styles.stepDescription}>
                                Start off by connecting Dingo with your Square
                                account. We&apos;ll analyze your inventory so
                                customers can make informed decisions based off
                                recommendations given to them.
                            </p>
                        </div>
                        <figure className={styles.step}>
                            <img className={styles.stepImage} src={priceTag} />
                            <h3 className={styles.stepLabel}>
                                Manage recommendations
                            </h3>
                            <p className={styles.stepDescription}>
                                Take control of what gets recommended all inside
                                the Dingo dashboard. Want to take a pause? Turn
                                off all recommendations until you&apos;re ready
                                to get back on again.
                            </p>
                        </figure>
                        <figure className={styles.step}>
                            <img
                                className={styles.stepImage}
                                src={shoppingBags}
                            />
                            <h3 className={styles.stepLabel}>
                                Watch customers come back again... and again!
                            </h3>
                            <p className={styles.stepDescription}>
                                Gain insight into how Dingo is impacting your
                                business. Whether it&apos;s visualizing trends
                                over time or recording your conversion rates, we
                                have the numbers for you.
                            </p>
                        </figure>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Home;
