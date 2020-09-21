import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import MoreView from './MoreView';
import Confirmation from '../Confirmation/Confirmation';
import { currentUser, logoutCurrentUser } from '../../redux/actions/sessions';
import { delayLoading } from '../../utils/helpers/generalHelpers';
import { getCurrentUser, getToken, removeCurrentUser } from '../../utils/helpers/sessionHelpers';
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

    const deleteAccount = () => {
        if (user) {
            const userId = user.id;
            const url = `http://localhost:3001/users/${userId}`;
            const token = getToken();
            const headers = { 'Authorization': token };
            axios.delete(url, { headers })
                .then(res => {
                    const { status } = res.data;
                    if (status === 200) {
                        removeCurrentUser();
                        props.history.push('/signup');
                    };
                })
                .catch(err => console.log(err));
        };
    };

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
        if (user === undefined) {
            dispatch(logoutCurrentUser());
            props.history.push('/');
        };
        const url = 'http://localhost:3001/user_is_authed';
        const token = getToken();
        const headers = { 'Authorization': token };
        axios.get(url, { headers })
            .then(res => {
                const { status } = res.data;
                if (status === 200) {
                    const user = getCurrentUser();
                    dispatch(currentUser(user));
                    delayLoading(1000, setLoading, false);
                } else {
                    props.history.push('/login');
                };
            });
    }, [currentUser, dispatch]);
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