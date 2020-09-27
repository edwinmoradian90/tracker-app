import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { GeneralButton, Input, Error } from '../../utils/styles/generalStyles';
import {
    lightGreen,
    green,
    medGrey,
    white,
} from '../../utils/colors/main';

const dropdown = keyframes`
    from { 
        margin-bottom: 100px;
        opacity: 0;
    }

    to {
        margin-bottom: 0px;
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

const InputContainer = styled.div`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 0 20px;
    width: 100%;
`;

const InputWrapper = styled.div`
    margin: 10px 0px;
    width: 100%;
`;

const Label = styled.div`
    color: ${medGrey};
    font-size: 11px;
    font-weight: 300;
    margin-bottom: 5px;
    opacity: .9;
`;

const ButtonContainer = styled.div`
    align-items: center;
    display: flex;
    font-size: 16px;
    font-weight: 300;
    flex-direction: column;
    padding: 10px 20px;
`;

const TrackersButton = styled.div`
    animation: ${fadein} 2s 1;
    color: ${medGrey};
    opacity: .9;
    top: 4vh;
    position: relative;
    &:hover {
        cursor: pointer;
    }
`;

const TrackerCreated = styled.div`
    animation: ${dropdown} .7s 1;
    color: ${green};
    display: flex;
    justify-content: center;
    margin-top: 12vh;
    opacity: .9;
`;

const HomeView = props => {
    const {
        onChange,
        submitTrackerForm,
        trackerCreated,
        notANumber,
        state,
        submitForm,
    } = props;
    const { amountDriven, drivingLimit, amountOfFuel } = state;
    return (
        <div className="homeView">
            <InputContainer>
                <InputWrapper className="addStatAmountDrivenContainer">
                    <Label>Amount driven (km)</Label>
                    <Input
                        animation={true}
                        name="amountDriven"
                        type="text"
                        className="addStatAmountDriven"
                        placeholder="Amount driven"
                        value={amountDriven}
                        onChange={e => onChange(e)}
                        disabled={trackerCreated}
                    />
                </InputWrapper>
                <InputWrapper className="addStatFuelContainer">
                    <Label> Fuel used (liters) </Label>
                    <Input
                        animation={true}
                        name="amountOfFuel"
                        type="text"
                        className="addStatFuel"
                        placeholder="Amount of fuel"
                        value={amountOfFuel}
                        onChange={e => onChange(e)}
                        disabled={trackerCreated}
                    />
                </InputWrapper>
                <InputWrapper className="addStatLimitContainer">
                    <Label>Driving limit (km)</Label>
                    <Input
                        animation={true}
                        name="drivingLimit"
                        type="text"
                        className="addStatLimit"
                        placeholder="Driving limit"
                        value={drivingLimit}
                        onChange={e => onChange(e)}
                        disabled={trackerCreated}
                    />
                </InputWrapper>
            </InputContainer>
            <Error
                margin="15px 15px 15px 20px"
                incorrectData={notANumber}
            >
                Only input numbers.
            </Error>
            <ButtonContainer>
                <GeneralButton
                    background={
                        amountDriven
                            ? green
                            : medGrey}
                    color={white}
                    className="submitNewTracker"
                    margin="0 0 0 0"
                    onClick={e => submitTrackerForm(e)}
                    submitForm={submitForm}
                    width="100%"
                >
                    {trackerCreated ? 'Add another one' : 'Create new tracker'}
                </GeneralButton>
                <TrackersButton
                    className="viewAllTrackers"
                    onClick={() => props.history.push("/trackers")}
                >
                    View all trackers
            </TrackersButton>
            </ButtonContainer>
            {
                trackerCreated
                    ?
                    <TrackerCreated className="trackerCreated">Tracker has been created!</TrackerCreated>
                    :
                    null
            }
        </div>
    );
};

const { object, func, bool } = PropTypes;
HomeView.propTypes = {
    submitTrackerForm: func.isRequired,
    onChange: func.isRequired,
    state: object.isRequired,
    trackerCreated: bool.isRequired,
    notANumber: bool.isRequired,
    submitForm: bool.isRequired,
};

export default withRouter(HomeView);