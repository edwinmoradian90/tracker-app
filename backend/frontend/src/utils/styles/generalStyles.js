import styled, { keyframes, css } from 'styled-components';
import { line, black, medGrey, lightGrey, warningRed } from '../colors/main';

const riseup = keyframes`
    from { 
        margin-top: 100px;
    }

    to {
        margin-top: 0px;
    }
`;

const dropdown = keyframes`
    from { 
        margin-bottom: 300px;
        opacity: 0;
    }

    to {
        margin-bottom: 0;
        opacity: .9;
    }
`;

const fadein = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: .9;
    }
`;

const GeneralButton = styled.div`
    ${props => props.animation ? css`
       animation: ${riseup} .7s 1;
    ` : null};
    align-items: center;
    background: ${props => props.background};
    border: ${props => props.border};
    border-radius: 3px;
    box-sizing: border-box;
    color: ${props => props.color};
    display: flex;
    font-size: 16px;
    height: ${props => props.height};
    justify-content: center;
    padding: 20px 10px;
    pointer-events: ${props => props.submitForm ? 'none' : 'auto'};
    margin: ${props => props.margin};
    min-width: 320px;
    max-width: 414px;
    width: ${props => props.width ? props.width : '100%'};
    &:hover {
        cursor: pointer;
    }
`;

const Input = styled.input`
    ${props => props.animation ? css`
        animation: ${dropdown} .7s 1;`
        : null
    }
    border: 0;
    border: 2px solid ${line};
    border-radius: 5px;
    box-sizing: border-box;
    color: ${medGrey};
    font-size: 16px;
    font-weight: 300;
    padding: 15px 20px;
    pointer-events: ${props => props.disabled ? 'none' : null};
    margin-bottom: ${props => props.marginBottom};
    min-width: ${props => props.minWidth ? props.minWidth : '320px'};
    max-width: ${props => props.maxWidth ? props.maxWidth : '414px'};
    width: ${props => props.width ? props.width : '100%'};
`;

const Error = styled.p`
    color: ${warningRed};
    display: flex;
    font-size: 14px;
    font-weight: 300;
    margin: ${props => props.margin ? props.margin : '20px'};
    visibility: ${props => props.incorrectData ? 'auto' : 'hidden'};
`;

const AppContainer = styled.div`
    background: ${lightGrey};
    box-shadow: 1px 5px 80px ${black};
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    margin: 0 auto;
    max-height: 896px;
    max-width: 414px;
    min-width: 320px;
    width: 100%;
    @media (min-width: 415px) and (max-height: 415px) {
        display: none;
        background: red;
        width: 100vw !important;
    };
`;

const RotateDevice = styled.p`
    display: none;
    @media (min-width: 415px) and (max-height: 415px) {
        align-items: center;
        background: ${lightGrey};
        color: ${medGrey};
        display: flex;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        height: 100vh;
        justify-content: center;
        line-height: 25px;
        width: 140vw;
    }
`;

export {
    GeneralButton,
    Input,
    Error,
    AppContainer,
    RotateDevice,
    fadein,
    riseup,
    dropdown
};
