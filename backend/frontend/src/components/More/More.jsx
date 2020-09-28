import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import MoreView from './MoreView';
import Confirmation from '../Confirmation/Confirmation';
import { currentUser } from '../../redux/actions/sessions';
import { delayLoading } from '../../utils/helpers/generalHelpers';
import { getCurrentUser } from '../../utils/helpers/sessionHelpers';
import { moreData } from '../../utils/confirmations/more/more';

const More = props => {
    const pageName = 'More';
    const dispatch = useDispatch();
    const moreOptions = [
        'Help',
        'Reset trackers',
        'Log out',
        'Edit account',
        'Delete account',
    ];
    const [loading, setLoading] = useState(true);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [confirmation, setConfirmation] = useState(moreData[2]);
    const user = useSelector(state => state.sessions.currentUser);

    const confirmationToggle = (bool = false) => {
        setConfirmationOpen(bool || !confirmationOpen);
    };

    const selectConfirmation = id => {
        setConfirmation(moreData[id]);
    };

    const redirectUser = () => {
        props.history.push('/login');
    };

    useEffect(() => {
        const user = getCurrentUser();
        dispatch(currentUser(user));
        delayLoading(1000, setLoading, false);
    }, [dispatch]);
    return (
        <div className='more'>
            <Header
                pageName={pageName}
            />
            {
                loading
                    ?
                    <Loading />
                    :
                    <>
                        <MoreView
                            moreOptions={moreOptions}
                            confirmationToggle={confirmationToggle}
                            confirmationOpen={confirmationOpen}
                            selectConfirmation={selectConfirmation}
                            user={user}
                        />
                        <Confirmation
                            confirmationOpen={confirmationOpen}
                            confirmationToggle={confirmationToggle}
                            confirmation={confirmation}
                            auxFunctions={redirectUser}
                        />
                    </>
            }
        </div>
    );
};

export default withRouter(More);