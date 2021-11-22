import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import styles from './styles.module.css';

const Results = ({ results }) => {
    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {results.map(({ name, squareId, itemInfo }) => (
                    <Item
                        key={squareId}
                        id={squareId}
                        name={name}
                        selected={false}
                        imageUrl={itemInfo.imageData?.url}
                        description={itemInfo.itemData?.description}
                        disablePointerInteractions
                    />
                ))}
            </ul>
        </section>
    );
};

Results.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Results;
