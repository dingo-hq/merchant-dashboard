import React from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import { SQUARE_OAUTH_LINK } from '../../constants';
import styles from './styles.module.css';

const Home = () => {
    const handleConnectClick = () => {
        window.location.href = SQUARE_OAUTH_LINK;
    };

    return (
        <section className={styles.container}>
            <PrimaryButton
                onClick={handleConnectClick}
                size="large"
                className={styles.connect}
            >
                Connect with Square
            </PrimaryButton>
        </section>
    );
};

export default Home;
