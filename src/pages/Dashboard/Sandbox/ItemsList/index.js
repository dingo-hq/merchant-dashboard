import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import styles from './styles.module.css';

const ItemsList = ({ items, onChange }) => {
    const [isItemSelected, setIsItemSelected] = useState({});

    useEffect(() => {
        const selectedItems = Object.keys(isItemSelected).filter(
            (itemId) => isItemSelected[itemId],
        );

        onChange(selectedItems);
    }, [isItemSelected]);

    const handleItemClick = (id) => {
        setIsItemSelected((prevSelectedItems) => ({
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
                    selected={isItemSelected[squareId]}
                    imageUrl={itemInfo.imageData?.url}
                    description={itemInfo.itemData?.description}
                />
            ))}
        </ul>
    );
};

ItemsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ItemsList;
