import React from 'react';
import PropTypes from 'prop-types';
import DashboardPage from '../../../components/DashboardPage';

const Sandbox = ({ pageName }) => {
    return <DashboardPage heading={pageName}></DashboardPage>;
};

Sandbox.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Sandbox;
