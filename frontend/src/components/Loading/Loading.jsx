import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { blue } from '../../utils/colors/main';

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80%;
`;

const Loading = ({ type = "cylon", color = blue }) => {
    return (
        <LoadingContainer>
            <ReactLoading
                type={type}
                color={color}
                height={75}
                width={75}
            />
        </LoadingContainer>
    );
};

export default Loading;