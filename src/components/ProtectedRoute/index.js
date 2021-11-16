import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import isUnauthorized from '../../utils/isUnauthorized';
import getMerchantDetails from '../../api/getMerchantDetails';

const ProtectedRoute = ({ exact, path, Component, name }) => {
    const history = useHistory();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await getMerchantDetails();
            } catch (error) {
                if (isUnauthorized(error)) {
                    history.push('/');
                }
            }
        };

        checkAuthentication();
    }, []);

    return (
        <Route
            exact={exact}
            path={path}
            component={() => <Component pageName={name} />}
        />
    );
};

ProtectedRoute.propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string.isRequired,
    Component: PropTypes.oneOf([PropTypes.element, PropTypes.func]).isRequired,
    name: PropTypes.string,
};

ProtectedRoute.defaultProps = {
    exact: false,
    name: null,
};

export default ProtectedRoute;
