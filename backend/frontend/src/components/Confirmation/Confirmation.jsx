import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ConfirmationView from './ConfirmationView';

const Confirmation = props => {
    const [confirmed, setConfirmed] = useState(false);
    const confirmAction = (bool) => {
        setConfirmed(bool || true);
    };
    return (
        <ConfirmationView
            {...props}
            confirmAction={confirmAction}
            confirmed={confirmed}
        />
    );
};

const { object, func, } = PropTypes;
Confirmation.propTypes = {
    auxFunctions: func,
    confirmation: object.isRequired,
    confirmationToggle: func.isRequired,
};

export default Confirmation;