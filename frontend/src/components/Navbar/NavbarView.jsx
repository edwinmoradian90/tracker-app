import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { FaChartLine } from 'react-icons/fa';
import { GiPieChart } from 'react-icons/gi';
import { BsThreeDots } from 'react-icons/bs';
import {
    white,
    blue,
    grey,
    darkGrey,
    medGrey,
} from '../../utils/colors/main';

const Navbar = styled.div`
    bottom: 103px;
    position: fixed;
    width: 375px;
`;

const NavbarList = styled.ul`
    align-items: center;
    background: ${darkGrey};
    display: flex;
    height: 70px;
    justify-content: space-around;
    list-style: none;
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
    font-size: 11px;
    font-weight: 400;
    margin-top: 5px;
`;


const NavbarView = props => {
    const { selectTab, selectedTab } = props;
    const { addStat, trackIt, progress, more } = selectedTab;
    console.log(selectedTab.addStat)
    return (
        <Navbar className="navbarView">
            <NavbarList className="navbar">
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
                <NavItem className="navbarItem">
                    <StyledLink to="/">
                        <Icon>
                            <BsThreeDots />
                        </Icon>
                        <IconText className="moreText">More</IconText>
                    </StyledLink>
                </NavItem>
            </NavbarList>
        </Navbar>
    );
};

export default NavbarView;