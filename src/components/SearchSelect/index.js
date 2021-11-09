import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { SearchInput } from 'evergreen-ui';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import styles from './styles.module.css';

const SearchSelect = ({ className, onSelect, values, searchKey }) => {
    const [showValues, setShowValues] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const fuse = new Fuse(values, {
        threshold: 0.25,
        keys: [searchKey],
    });

    const handleClick = (value) => {
        setShowValues(false);
        setSearchValue(value);
        onSelect(value);
    };

    const filteredValues = useMemo(
        () =>
            searchValue
                ? fuse.search(searchValue).map(({ item }) => item)
                : values,
        [searchValue],
    );

    return (
        <div className={classNames(styles.container, className)}>
            <SearchInput
                placeholder="Search inventory items"
                width="100%"
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowValues(true)}
                value={searchValue}
            />
            <ul className={styles.list}>
                {showValues &&
                    filteredValues.map((obj) => (
                        <li
                            key={obj[searchKey]}
                            className={styles.listItem}
                            onClick={() => handleClick(obj[searchKey])}
                        >
                            {obj[searchKey]}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

SearchSelect.propTypes = {
    className: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    searchKey: PropTypes.string.isRequired,
};

SearchSelect.defaultProps = {
    className: null,
};

export default SearchSelect;
