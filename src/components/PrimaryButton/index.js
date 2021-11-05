import React from 'react';
import { Button } from 'evergreen-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.css';

const PrimaryButton = ({
    children,
    onClick,
    iconBefore,
    size,
    isLoading,
    className,
}) => {
    return (
        <Button
            appearance="primary"
            className={classNames(styles.button, className)}
            iconBefore={iconBefore}
            size={size}
            onClick={onClick}
            isLoading={isLoading}
        >
            {children}
        </Button>
    );
};

PrimaryButton.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    iconBefore: PropTypes.object,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    isLoading: PropTypes.bool,
    className: PropTypes.string,
};

PrimaryButton.defaultProps = {
    onClick: () => {},
    iconBefore: null,
    size: 'small',
    isLoading: false,
    className: null,
};

export default PrimaryButton;
