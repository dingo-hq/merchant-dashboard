import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { GridViewIcon, PropertiesIcon, ShopIcon } from 'evergreen-ui';
import classNames from 'classnames';
import Navigation from '../../components/Navigation';
import PrimaryButton from '../../components/PrimaryButton';
import SquareLogo from '../../components/SquareLogo';
import { SQUARE_OAUTH_URL } from '../../constants/urls';
import business from '../../assets/business.svg';
import shoppingBags from '../../assets/shopping-bags.svg';
import priceTag from '../../assets/price-tag.svg';
import cart from '../../assets/cart.svg';
import getMerchantDetails from '../../api/getMerchantDetails';
import isUnauthorized from '../../utils/isUnauthorized';
import collagePhoto from '../../assets/collage.png';
import styles from './styles.module.css';

const Home = () => {
    const history = useHistory();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const howItWorksEl = useRef(null);

    const navItems = [
        {
            icon: ShopIcon,
            label: 'How it Works',
            targetRef: howItWorksEl,
        },
    ];

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

    const scrollToRef = (clickedRef) => {
        clickedRef.current.scrollIntoView({ behavior: 'smooth' });
    };

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
                <Navigation
                    navItems={navItems}
                    showLogOut={isAuthenticated}
                    onNavItemClick={scrollToRef}
                />
            </header>
            <section className={styles.landing}>
                <div
                    className={classNames(
                        styles.contentContainer,
                        styles.landingContainer,
                    )}
                >
                    <div className={styles.landingContent}>
                        <h1 className={styles.landingMessage}>
                            <span className={styles.highlight}>Accelerate</span>{' '}
                            your business through the power of{' '}
                            <span className={styles.highlight}>
                                recommendations
                            </span>
                        </h1>
                        <p className={styles.landingDescription}>
                            Looking to grow your customer base or increase
                            customer retention? Take control of your business by
                            integrating your Square account with Dingo today!
                        </p>
                        {ctaButton}
                    </div>
                    <div className={styles.illustrationContainer}>
                        <img className={styles.illustration} src={business} />
                    </div>
                </div>
            </section>
            <section className={styles.mission}>
                <div
                    className={classNames(
                        styles.contentContainer,
                        styles.missionContainer,
                    )}
                >
                    <div className={styles.missionPhotoContainer}>
                        <img
                            src={collagePhoto}
                            className={styles.missionPhoto}
                        />
                    </div>
                    <div className={styles.missionContent}>
                        <h2 className={styles.sectionTitle}>What We Do</h2>
                        <p className={styles.missionDescription}>
                            Dingo aims to find ways to help businesses continue
                            bringing customers back. Whether it&apos;s buying a
                            cup of coffee at a local coffee shop or a small
                            succulent plant at a plaza across the street, we
                            understand it can be challenging to retain
                            customers, and we want to turn that around. We
                            provide a set of easy-to-use tools that allow
                            businesses to recommend items straight to their
                            customers after they make a successful purchase so
                            that at the end of the day, you&apos;ll leave them
                            with something that will keep them coming back!
                        </p>
                    </div>
                </div>
            </section>
            <section className={styles.how} ref={howItWorksEl}>
                <div
                    className={classNames(
                        styles.contentContainer,
                        styles.howContainer,
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
                                Recommendations sent to customers
                            </h3>
                            <p className={styles.stepDescription}>
                                After a customer makes a successful purchase,
                                they will be sent a link where they can view
                                their recommendations. In the Dingo dashboard,
                                you have the option to configure this to your
                                liking!
                            </p>
                        </figure>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Home;
