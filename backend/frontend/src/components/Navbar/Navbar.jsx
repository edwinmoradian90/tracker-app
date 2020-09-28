import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { getCurrentUser, getHeaders, removeCurrentUser } from '../../utils/helpers/sessionHelpers';
import NavbarView from './NavbarView';

const Navbar = props => {
    const user = getCurrentUser();
    const headers = getHeaders();
    const path = `/${props.location.pathname.split('/')[1]}`;
    const pageRef = {
        "/": "addStat",
        "/trackers": "trackIt",
        "/progress": "progress",
        "/more": "more",
    };
    const currentPage = pageRef[path];
    const [selectedTab, setSelectedTab] = useState({
        addStat: true,
        trackIt: false,
        progress: false,
        more: false,
    });
    const [requireLogin, setRequireLogin] = useState(false);

    useEffect(() => {
        const noTabSelected = {
            addStat: false,
            trackIt: false,
            progress: false,
            more: false,
        };
        if (selectedTab[currentPage]) return;
        setSelectedTab({
            addStat: false,
            trackIt: false,
            progress: false,
            more: false,
            [currentPage]: true,
        });
        if (requireLogin) {
            setRequireLogin(false);
            setSelectedTab(noTabSelected);
        };
        if (headers !== {} && user) {
            axios.get('/user_is_authed', { headers })
                .then(res => {
                    const { status } = res.data;
                    if (status !== 200) {
                        removeCurrentUser();
                        setSelectedTab(noTabSelected);
                        setRequireLogin(true);
                        props.history.push('/login');
                    };
                })
                .catch(err => console.log(err));
        } else {
            setRequireLogin(true);
            setSelectedTab(noTabSelected);
            props.history.push('/login');
        };
    }, [currentPage, requireLogin]);

    return (
        <NavbarView
            selectedTab={selectedTab}
            user={user}
            requireLogin={requireLogin}
        />
    );
};

export default withRouter(Navbar);