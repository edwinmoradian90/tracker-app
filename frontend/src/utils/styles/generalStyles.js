import styled, { keyframes } from 'styled-components';

const riseup = keyframes`
    from { 
        margin-top: 100px;
    }

    to {
        margin-top: 0px;
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

const GeneralButton = styled.div`
    animation: ${riseup} .7s 1;
    align-items: center;
    background: ${props => props.background};
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

export { GeneralButton, fadein };
