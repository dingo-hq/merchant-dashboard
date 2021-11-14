import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, Spinner } from 'evergreen-ui';
import styles from './styles.module.css';

const OverlaySpinner = ({ isShown }) => {
    return (
        <Overlay
            shouldCloseOnClick={false}
            shouldCloseOnEscapePress={false}
            isShown={isShown}
            preventBodyScrolling
        >
            <div className={styles.spinnerContainer}>
                <Spinner size={64} />
            </div>
        </Overlay>
    );
};

OverlaySpinner.propTypes = {
    isShown: PropTypes.bool.isRequired,
};

export default OverlaySpinner;
