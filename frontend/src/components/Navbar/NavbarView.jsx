import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { FaChartLine } from 'react-icons/fa';
import { GiPieChart } from 'react-icons/gi';
import { BsThreeDots } from 'react-icons/bs';

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
                    <li className="navbarItem">
                        <IoMdAdd />
                        <p className="addStatText">Add stat</p>
                    </li>
                </Link>
                <Link to="/trackers">
                    <li className="navbarItem">
                        <FaChartLine />
                        <p className="trackItText">Track.it</p>
                    </li>
                </Link>
                <Link to="/progress">
                    <li className="navbarItem">
                        <GiPieChart />
                        <p className="progressText">Your progress</p>
                    </li>
                </Link>
                <li className="navbarItem">
                    <BsThreeDots />
                    <p className="moreText">More</p>
                </li>
            </NavbarList>
        </div>
    );
};

export default NavbarView;