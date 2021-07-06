import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { FaChartLine } from 'react-icons/fa';
import { GiPieChart } from 'react-icons/gi';
import { BsThreeDots } from 'react-icons/bs';
import {
    white,
    blue,
    darkGrey,
    medGrey,
    black
} from '../../utils/colors/main';

const Navbar = styled.div`
    background: ${black};
    bottom: 0;
    height: 70px;
    pointer-events: ${props => props.requireLogin ? 'none' : 'auto'};
    position: fixed;
    width: 100%;
    max-width: 414px;
    z-index: 10000;
`;

const NavbarList = styled.ul`
    align-items: center;
    background: ${black};
    display: flex;
    height: 70px;
    justify-content: space-around;
    list-style: none;
    pointer-events: ${props => props.requireLogin ? 'none' : 'auto'};
`;

const StyledLink = styled(Link)`
    align-items: center;
    color: ${props => props.tab ? white : medGrey};
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    width: 100%;
    z-index: 100;
`;

const NavItem = styled.li`
    background: ${props => props.tab ? blue : darkGrey};
    height: 100%;
    width: 100%;
`;

const Icon = styled.div`
    color: ${props => props.tab ? white : medGrey};
    font-size: 20px;
`;

const IconText = styled.p`
    color: ${props => props.tab ? white : medGrey};
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 400;
    margin-top: 5px;
`;


const NavbarView = props => {
    const { selectedTab, user, requireLogin } = props;
    const { addStat, trackIt, progress, more } = selectedTab;
    return (
        <Navbar requireLogin={requireLogin} user={user} className="navbarView">
            <NavbarList requireLogin={requireLogin} className="navbar">
                <NavItem
                    tab={addStat}
                    name="addStat"
                    className="navbarItem"
                >
                    <StyledLink tab={addStat} name="addStat" to="/">
                        <Icon tab={addStat} name="addStat">
                            <IoMdAdd name="addStat" />
                        </Icon>
                        <IconText tab={addStat} name="addStat" className="addStatText">Add stat</IconText>
                    </StyledLink>
                </NavItem>
                <NavItem
                    tab={trackIt}
                    name="trackIt"
                    className="navbarItem"
                >
                    <StyledLink tab={trackIt} name="trackIt" to="/trackers">
                        <Icon tab={trackIt} name="trackIt">
                            <FaChartLine />
                        </Icon>
                        <IconText tab={trackIt} name="trackIt" className="trackItText">Track.it</IconText>
                    </StyledLink>
                </NavItem>
                <NavItem
                    tab={progress}
                    name="progress"
                    className="navbarItem">
                    <StyledLink tab={progress} name="progress" to="/progress">
                        <Icon tab={progress} name="progress">
                            <GiPieChart />
                        </Icon>
                        <IconText tab={progress} name="progress" className="progressText">Progress</IconText>
                    </StyledLink>
                </NavItem>
                <NavItem tab={more} name="more" className="navbarItem">
                    <StyledLink tab={more} to="/more">
                        <Icon tab={more}>
                            <BsThreeDots />
                        </Icon>
                        <IconText tab={more} className="moreText">More</IconText>
                    </StyledLink>
                </NavItem>
            </NavbarList>
        </Navbar>
    );
};

const { object, bool } = PropTypes;
NavbarView.propTypes = {
    selectedTab: object.isRequired,
    requireLogin: bool.isRequired,
    user: object,
};

export default NavbarView;