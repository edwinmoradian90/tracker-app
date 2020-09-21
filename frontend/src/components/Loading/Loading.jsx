import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { blue } from '../../utils/colors/main';

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80%;
`;

const Loading = ({ type = "bubbles", color = blue }) => {
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

Loading.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
};

export default Loading;