import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import isUnauthorized from '../../utils/isUnauthorized';
import getMerchantDetails from '../../api/getMerchantDetails';

const ProtectedRoute = ({ exact, path, component }) => {
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

    return <Route exact={exact} path={path} component={component} />;
};

ProtectedRoute.propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string.isRequired,
    component: PropTypes.element.isRequired,
};

ProtectedRoute.defaultProps = {
    exact: false,
};

export default ProtectedRoute;
