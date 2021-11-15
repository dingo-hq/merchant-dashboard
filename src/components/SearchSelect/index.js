import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { SearchInput } from 'evergreen-ui';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import styles from './styles.module.css';

const SearchSelect = ({ className, onSelect, values, placeholder }) => {
    const [showValues, setShowValues] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const fuse = new Fuse(values, {
        threshold: 0.25,
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
            <div className={styles.inputContainer}>
                <SearchInput
                    placeholder={placeholder}
                    width="100%"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowValues(true)}
                    value={searchValue}
                />
            </div>
            <ul className={styles.list}>
                {showValues &&
                    filteredValues.map((value) => (
                        <li
                            key={value}
                            className={styles.listItem}
                            onClick={() => handleClick(value)}
                        >
                            {value}
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
    placeholder: PropTypes.string,
};

SearchSelect.defaultProps = {
    className: null,
    placeholder: '',
};

export default SearchSelect;
