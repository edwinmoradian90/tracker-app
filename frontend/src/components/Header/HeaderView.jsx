import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
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
    margin-left: 12px;
    margin-right: 28%;
    &:hover {
        cursor: pointer;
    };
`;

const PageName = styled.div`
    color: ${white};
    font-family: 'Roboto', sans-serif;
    font-size: 19px;
    margin-right: 31%;
    margin-top: 2px;
`;

const AddStatButton = styled(Link)`
    color: ${white};
    font-size: 25px;
    margin-top: 5px;
`;

const HeaderView = props => {
    const { pageName } = props;
    console.log(pageName)
    return (
        <NavContainer className="headerView">
            <Arrow onClick={props.history.goBack} className="backButton">
                <IoIosArrowBack />
            </Arrow>
            <PageName className="pageName">
                {pageName}
            </PageName>
            {
                pageName === 'Track it'
                    ?
                    <AddStatButton to="/">
                        <AiOutlinePlus />
                    </AddStatButton>
                    :
                    null
            }
        </NavContainer>
    );
};

export default withRouter(HeaderView);