import styled, { keyframes, css } from 'styled-components';
import { line, medGrey, warningRed } from '../colors/main';

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
    height: ${props => props.height};
    justify-content: center;
    padding: 20px 10px;
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

export { GeneralButton, Input, Error, fadein, riseup, dropdown };
