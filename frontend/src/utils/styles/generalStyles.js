import styled from 'styled-components';

const GeneralButton = styled.div`
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

export { GeneralButton };
