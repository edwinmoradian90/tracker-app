import styled, { keyframes, css } from 'styled-components';

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
        opacity: .7;
    }
`;

const fadein = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: .7;
    }
`;

const animate = `riseup .7s 1`;

const GeneralButton = styled.div`
    ${props => props.animation ? css`
       animation: ${riseup} .7s 1;
    ` : null};
    align-items: center;
    background: ${props => props.background};
    border: ${props => props.border};
    border-radius: 3px;
    color: ${props => props.color};
    display: flex;
    height: ${props => props.height};
    justify-content: center;
    padding: 20px 10px;
    margin: ${props => props.margin};
    width: ${props => props.width};
    &:hover {
        cursor: pointer;
    }
`;

export { GeneralButton, fadein, riseup, dropdown };
