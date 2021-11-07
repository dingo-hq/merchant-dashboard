import React from 'react';
import Navigation from '../../components/Navigation';
import PrimaryButton from '../../components/PrimaryButton';
import SquareLogo from '../../components/SquareLogo';
import { SQUARE_OAUTH_LINK } from '../../constants';
import business from '../../assets/business.svg';
import styles from './styles.module.css';

const Home = () => {
    const handleConnectClick = () => {
        window.location.href = SQUARE_OAUTH_LINK;
    };

    return (
        <section className={styles.container}>
            <header>
                <Navigation showLogOut={false} />
            </header>
            <section className={styles.landing}>
                <div className={styles.content}>
                    <h1 className={styles.message}>
                        Accelerate your business and attract more customers.
                    </h1>
                    <p className={styles.description}>
                        Looking to grow your customer base or increase the
                        number of recurring customers? Take control of your
                        business by integrating your Square account with Dingo!
                    </p>
                    <PrimaryButton
                        onClick={handleConnectClick}
                        size="large"
                        className={styles.connect}
                        iconBefore={SquareLogo}
                    >
                        Connect with Square
                    </PrimaryButton>
                </div>
                <div className={styles.illustrationContainer}>
                    <img className={styles.illustration} src={business} />
                </div>
            </section>
        </section>
    );
};

export default Home;
