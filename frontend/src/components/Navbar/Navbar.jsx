import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getCurrentUser } from '../../utils/sessionHelpers';
import NavbarView from './NavbarView';

const Navbar = props => {
    const user = getCurrentUser();
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

    useEffect(() => {
        if (selectedTab[currentPage]) return;
        setSelectedTab({
            addStat: false,
            trackIt: false,
            progress: false,
            more: false,
            [currentPage]: true,
        });
    }, [currentPage]);

    return (
        <NavbarView
            selectedTab={selectedTab}
            user={user}
        />
    );
};

export default withRouter(Navbar);