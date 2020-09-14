import React, { useState, useEffect } from 'react';
import NavbarView from './NavbarView';

const Navbar = () => {
    const [selectedTab, setSelectedTab] = useState({
        addStat: true,
        trackIt: false,
        progress: false,
        more: false,
    });

    const selectTab = e => {
        e.preventDefault();
        const name = e.target.attributes.name.nodeValue;
        if (selectedTab[name]) return;
        setSelectedTab({
            addStat: false,
            trackIt: false,
            progress: false,
            more: false,
            [name]: !selectedTab[name],
        });
        console.log(e.target.attributes.name.nodeValue)
    };

    return (
        <NavbarView
            selectTab={selectTab}
            selectedTab={selectedTab}
        />
    );
};

export default Navbar;