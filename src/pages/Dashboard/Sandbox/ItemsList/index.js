import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import styles from './styles.module.css';

const ItemsList = ({ items }) => {
    const [selectedItems, setSelectedItems] = useState({});

    const handleItemClick = (id) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [id]: !prevSelectedItems[id],
        }));
    };

    return (
        <ul className={styles.list}>
            {items.map(({ name, squareId, itemInfo }) => (
                <Item
                    key={squareId}
                    id={squareId}
                    name={name}
                    onClick={handleItemClick}
                    selected={selectedItems[squareId]}
                    imageUrl={itemInfo.imageData?.url}
                    description={itemInfo.itemData?.description}
                />
            ))}
        </ul>
    );
};

ItemsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemsList;
