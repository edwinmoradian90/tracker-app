import React from 'react'
import { FaSadTear } from 'react-icons/fa';
import styled from 'styled-components';
import Header from '../Header/Header';
import { medGrey } from '../../utils/colors/main';

const ErrorContainer = styled.section`
    padding: 0 20px;
`;

const ErrorWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 500px;
    justify-content: center;
    width: 100%;
`;

const ErrorText = styled.p`
    color: ${medGrey};
    font-size: 22px;
    font-weight: 300;
`;

const Icon = styled.div`
    color: ${medGrey};
    display: flex;
    font-size: 100px;
    justify-content: center;
    margin-top: 40px;
    width: 100%;
`;

const Error = () => {
    return (
        <div>
            <Header pageName="Wrong page" />
            <ErrorContainer>
                <ErrorWrapper>
                    <ErrorText className="errorView">Sorry, that page does not exist.</ErrorText>
                    <Icon><FaSadTear /></Icon>
                </ErrorWrapper>
            </ErrorContainer>
        </div>
    );
};

export default Error;
