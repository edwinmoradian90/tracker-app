import React, { useState, useEffect } from 'react';
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

export default Confirmation;