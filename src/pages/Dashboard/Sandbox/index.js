import React from 'react';
import PropTypes from 'prop-types';
import DashboardPage from '../../../components/DashboardPage';

const Sandbox = ({ pageName }) => {
    return (
        <DashboardPage
            heading={pageName}
            subheading="Simulate and preview how items are recommended to customers"
        ></DashboardPage>
    );
};

Sandbox.propTypes = {
    pageName: PropTypes.string.isRequired,
};

export default Sandbox;
