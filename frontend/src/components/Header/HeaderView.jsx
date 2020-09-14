import React from 'react';
import { withRouter } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';

const NavContainer = styled.div`
    align-items: center;
    display: flex;
`;

const Arrow = styled.div`
    font-size: 30px;
    margin-top: 10px;
    margin-right: 33%;
`;

const HeaderView = props => {
    const { pageName } = props;
    return (
        <NavContainer className="headerView">
            <Arrow onClick={props.history.goBack} className="backButton">
                <IoIosArrowBack />
            </Arrow>
            <div className="pageName">
                {pageName}
            </div>
        </NavContainer>
    );
};

export default withRouter(HeaderView);