import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { GeneralButton } from '../../utils/styles/generalStyles';
import {
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

const InputContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

const InputWrapper = styled.div`
    margin: 10px 0px;
`;

const Input = styled.input`
    animation: ${dropdown} .7s 1;
    color: ${medGrey};
    opacity: .7;
`;

const Label = styled.div`
    color: ${medGrey};
    font-size: 11px;
    font-weight: 300;
    margin-bottom: 5px;
    opacity: .7;
`;

const ButtonContainer = styled.div`
    align-items: center;
    display: flex;
    font-size: 16px;
    font-weight: 300;
    flex-direction: column;
    padding: 10px;
`;

const TrackersButton = styled.div`
    animation: ${fadein} 2s 1;
    color: ${medGrey};
    opacity: .7;
    top: 4vh;
    position: relative;
    &:hover {
        cursor: pointer;
    }
`;

const TrackerCreated = styled.div`
    color: ${green};
    display: flex;
    justify-content: center;
    margin-top: 6vh;
    opacity: .7;
`;

const HomeView = props => {
    const { onChange, submitTrackerForm, trackerCreated, state } = props;
    const { amountDriven, drivingLimit, amountOfFuel } = state;
    return (
        <div className="homeView">
            <InputContainer>
                <InputWrapper className="addStatAmountDrivenContainer">
                    <Label>Amount driven (km)</Label>
                    <Input
                        name="amountDriven"
                        type="text"
                        className="addStatAmountDriven"
                        placeholder="Amount driven"
                        value={amountDriven}
                        onChange={e => onChange(e)}
                    />
                </InputWrapper>
                <InputWrapper className="addStatFuelContainer">
                    <Label> Fuel used (liters) </Label>
                    <Input
                        name="amountOfFuel"
                        type="text"
                        className="addStatFuel"
                        placeholder="Amount of fuel"
                        value={amountOfFuel}
                        onChange={e => onChange(e)}
                    />
                </InputWrapper>
                <InputWrapper className="addStatLimitContainer">
                    <Label>Driving limit (km)</Label>
                    <Input
                        name="drivingLimit"
                        type="text"
                        className="addStatLimit"
                        placeholder="Driving limit"
                        value={drivingLimit}
                        onChange={e => onChange(e)}
                    />
                </InputWrapper>
            </InputContainer>
            <ButtonContainer>
                <GeneralButton
                    background={amountDriven ? green : medGrey}
                    color={white}
                    width="190px"
                    className="submitNewTracker"
                    onClick={e => submitTrackerForm(e)}
                >
                    Create new tracker
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

export default withRouter(HomeView);