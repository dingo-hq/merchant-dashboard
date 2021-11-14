import React from 'react';
import { Button } from 'evergreen-ui';
import notFoundPhoto from '../../assets/not-found.svg';
import navigateToHome from '../../utils/navigateToHome';
import Navigation from '../../components/Navigation';
import styles from './styles.module.css';

const NotFound = (props) => {
    return (
        <section className={styles.container}>
            <Navigation showLogOut={false} edgeShadow={false} />
            <div className={styles.content}>
                <div className={styles.photoContainer}>
                    <span className={styles.errorCode}>404</span>
                    <img src={notFoundPhoto} className={styles.photo} />
                </div>
                <h1 className={styles.title}>Page Not Found</h1>
                <p className={styles.description}>
                    The page you are looking for could not be found.
                </p>
                <Button size="large" onClick={navigateToHome}>
                    Take Me Home
                </Button>
            </div>
        </section>
    );
};

NotFound.propTypes = {};

export default NotFound;
