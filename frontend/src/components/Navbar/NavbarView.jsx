import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarList = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
`;

const NavbarView = () => {
    return (
        <div className="navbarView">
            <NavbarList className="navbar">
                <Link to="/">
                    <li className="navbarItem">Add Stat</li>
                </Link>
                <Link to="/trackers">
                    <li className="navbarItem">Track.it</li>
                </Link>
                <Link to="/progress">
                    <li className="navbarItem">Your progress</li>
                </Link>
                <li className="navbarItem">More</li>
            </NavbarList>
        </div>
    );
};

export default NavbarView;