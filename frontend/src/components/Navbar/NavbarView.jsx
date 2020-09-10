import React from 'react';
import styled from 'styled-components';

const NavbarList = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
`

const NavbarView = () => {
    return (
        <div className="navbarView">
            <NavbarList className="navbar">
                <li className="navbarItem">Add Stat</li>
                <li className="navbarItem">Track.it</li>
                <li className="navbarItem">Your progress</li>
                <li className="navbarItem">More</li>
            </NavbarList>
        </div>
    );
};

export default NavbarView;