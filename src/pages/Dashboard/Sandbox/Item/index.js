import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import itemPlaceholder from '../../../../assets/item-placeholder.svg';
import styles from './styles.module.css';

const Item = ({ id, name, description, imageUrl, selected, onClick }) => {
    const imgSrc = imageUrl || itemPlaceholder;

    return (
        <li
            className={classNames(styles.card, selected && styles.selected)}
            onClick={() => onClick(id)}
        >
            <img src={imgSrc} className={styles.image} />
            <div className={styles.content}>
                <div className={styles.info}>
                    <h2 className={styles.name}>{name}</h2>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
        </li>
    );
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

Item.defaultProps = {
    description: '',
    imageUrl: '',
};

export default Item;
