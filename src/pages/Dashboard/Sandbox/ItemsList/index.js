import React from 'react';
import PropTypes from 'prop-types';

const ItemsList = ({ children, innerRef }) => {
    return <ul ref={innerRef}>{children}</ul>;
};

ItemsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemsList;
