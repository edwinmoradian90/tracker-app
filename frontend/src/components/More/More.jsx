import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import MoreView from './MoreView';
import { currentUser } from '../../redux/actions/sessions';
import { getCurrentUser, getToken, removeCurrentUser } from '../../utils/sessionHelpers';
import { delayLoading } from '../../utils/generalHelpers';
import { useDispatch, useSelector } from 'react-redux';

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

    const optionsFunctionality = [
        '', '', '', '', deleteAccount
    ];

    useEffect(() => {
        const url = 'http://localhost:3001/user_is_authed';
        const token = getToken();
        const headers = { 'Authorization': token };
        console.log('more page')
        axios.get(url, { headers })
            .then(res => {
                console.log(res)
                const { status } = res.data;
                if (status === 200) {
                    const user = getCurrentUser();
                    dispatch(currentUser(user));
                    delayLoading(1000, setLoading, false);
                } else {
                    props.history.push('/login');
                };
            });
    }, [currentUser]);
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
                    <MoreView
                        optionsFunctionality={optionsFunctionality}
                        moreOptions={moreOptions}
                        user={user}
                    />
            }
        </div>
    );
};

export default withRouter(More);