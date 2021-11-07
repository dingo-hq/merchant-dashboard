import React from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import SquareLogo from '../../components/SquareLogo';
import { SQUARE_OAUTH_LINK } from '../../constants';
import styles from './styles.module.css';

const Home = () => {
    const handleConnectClick = () => {
        window.location.href = SQUARE_OAUTH_LINK;
    };

    return (
        <main className={styles.container}>
            <PrimaryButton
                onClick={handleConnectClick}
                size="large"
                className={styles.connect}
                iconBefore={SquareLogo}
            >
                Connect with Square
            </PrimaryButton>
        </main>
    );
};

export default Home;
