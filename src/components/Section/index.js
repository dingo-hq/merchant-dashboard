import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Section = ({ title, children }) => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </section>
    );
};

Section.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
};

Section.defaultProps = {
    title: '',
};

export default Section;
