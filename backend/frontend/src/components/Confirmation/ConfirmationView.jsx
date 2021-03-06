import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import {
    black,
    white,
    medGrey
} from '../../utils/colors/main';

const ConfirmationViewContainer = styled.section`
    background: rgb(0,0,0, .1);
    display: ${props => props.confirmationOpen ? 'block' : 'none'};
    position: absolute;
    height: 100vh;
    top: 0;
    width: 100%;
    max-width: 414px;
    z-index: 1000;
`;

const ConfirmationWrapper = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
    max-width: 414px;
`;

const ConfirmationContainer = styled.div`
    background: ${white};
    box-shadow: 1px 1px 60px ${medGrey};
    border-radius: 5px;
    height: 200px;
    padding-top: 20px;
    width: 300px;
`;

const ConfirmationButtonContainer = styled.div`
    border-top: 1px solid lightgray;
    display: flex;
    
`;

const ConfirmationLabel = styled.label`
    color: ${black};
    font-size: 18px;
    font-weight: 700;
    padding: 0px  20px;
    opacity: .7;
`;

const ConfirmationMessage = styled.p`
    color: ${medGrey};
    font-size: 14px;
    height: 65px;
    line-height: 20px;
    margin: 20px 0;
    padding: 0 20px;
`;

const ConfirmButton = styled.button`
    background: ${white};
    border: 0;
    border-right: 1px solid lightgray;
    display: ${props => props.confirmed ? 'none' : 'block'};
    height: 70px;
    opacity: .7;
    width: 50%;
    &:hover {
        cursor: pointer;
    }
`;

const DenyButton = styled.button`
    background: ${white};
    border: 0;
    height: 70px;
    opacity: .7;
    width: ${props => props.confirmed ? '100%' : '50%'};
    &:hover {
        cursor: pointer;
    }
`;

const ConfirmationView = props => {
    const {
        auxFunctions,
        confirmationOpen,
        confirmationToggle,
        confirmation,
        confirmAction,
        confirmed,
        id,
    } = props;
    return (
        <ConfirmationViewContainer
            confirmationOpen={confirmationOpen}
            className="confirmationView"
        >
            <ConfirmationWrapper>
                <ConfirmationContainer className="confirmationContainer">
                    <ConfirmationLabel className="confirmationTitle">Confirmation</ConfirmationLabel>
                    <ConfirmationMessage className="confirmationMessage">
                        {
                            confirmation.message !== null
                                ? confirmed ? confirmation.affirmation : confirmation.message
                                : null
                        }
                    </ConfirmationMessage>
                    <ConfirmationButtonContainer className="confirmationButtonContainer">
                        <ConfirmButton
                            confirmed={confirmed}
                            onClick={confirmation.confirm !== null
                                ? () => {
                                    confirmation.confirm(id ? id : null);
                                    confirmAction();
                                }
                                : null}
                        >
                            Yes
                        </ConfirmButton>
                        <DenyButton
                            confirmed={confirmed}
                            onClick={() => {
                                confirmationToggle(false)
                                if (confirmed) {
                                    auxFunctions();
                                };
                            }}
                        >
                            {confirmed ? 'Okay' : 'No'}
                        </DenyButton>
                    </ConfirmationButtonContainer>
                </ConfirmationContainer>
            </ConfirmationWrapper>
        </ConfirmationViewContainer>
    );
};

const { func, bool, object, string } = PropTypes;
ConfirmationView.propTypes = {
    auxFunctions: func,
    confirmationAction: func,
    id: string,
    confirmationOpen: bool.isRequired,
    confirmationToggle: func.isRequired,
    confirmation: object.isRequired,
    confirmed: bool.isRequired,
};

export default withRouter(ConfirmationView);