import React from 'react';
import { withRouter } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import { blue, white } from '../../utils/colors/main';

const NavContainer = styled.div`
    align-items: center;
    background: ${blue};
    display: flex;
`;

const Arrow = styled.div`
    color: ${white};
    font-size: 30px;
    margin-top: 10px;
    margin-right: 33%;
    &:hover {
        cursor: pointer;
    };
`;

const PageName = styled.div`
    color: ${white};
`;

const HeaderView = props => {
    const { pageName } = props;
    return (
        <NavContainer className="headerView">
            <Arrow onClick={props.history.goBack} className="backButton">
                <IoIosArrowBack />
            </Arrow>
            <PageName className="pageName">
                {pageName}
            </PageName>
        </NavContainer>
    );
};

export default withRouter(HeaderView);