import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Line } from 'rc-progress';
import { GoPencil } from 'react-icons/go';
import { AiFillCar } from 'react-icons/ai';
import { RiGasStationFill } from 'react-icons/ri';
import { GiSteeringWheel } from 'react-icons/gi';
import { BsFillTrashFill } from 'react-icons/bs';
import {
    black,
    medGrey,
    blue,
    green,
    white,
    warningRed,
} from '../../utils/colors/main';
import { GeneralButton, Input } from '../../utils/styles/generalStyles';

const dropdown = keyframes`
    from { 
        margin-bottom: 100px;
    }

    to {
        margin-bottom: 0;
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

const TrackerContainer = styled.div`
    height: ${props => props.editMode ? '100vh' : 'auto'};
    max-height: 100vh;
`;

const TopIconContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0px 20px;
`;

const CardContainer = styled.div`
    animation: ${dropdown} .7s 1;
    align-items: center;
    border-radius: 4px;
    background: ${white};
    display: flex;
    justify-content: space-between;
    margin: 20px 20px;
    padding: 20px 10px;
`;

const Percent = styled.div`
    animation: ${fadein} .7s 1;
    color: ${medGrey};
    font-size: 12px;
    margin-bottom: 5px;
    opacity: .9;
`;

const LineContainer = styled.div`
    margin: auto;
    padding: 10px 20px 0 20px;
    opacity: 1;
`;

const StatContainer = styled.div`
    padding-left: 20px;
`;

const Label = styled.p`
    color: ${medGrey};
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 300;
    margin-bottom: 10px;
`;

const Stat = styled.p`
    color: ${black};
    font-size: 16px;
    font-weight: 300;
    padding: 7.5px 0px;
`;

const TrackerIconWrapper = styled.div`
    color: ${blue};
    font-size: 30px;
    padding-right: 20px;
`;

const ButtonsEditMode = styled.div`
    margin: 0 20px 0 20px;
`;

const EditButtonContainer = styled.div`
    width: 100%;
`;

const EditButton = styled.div`
    animation: ${fadein} .7s 1;
    align-items: center;
    color: ${props => props.editMode ? blue : 'lightgrey'};
    font-size: 25px;
`;

const TrashCan = styled.span`
    animation: ${fadein} 1s 1;
    color: ${warningRed};
    font-size: 23px;
    opacity: .8;
    visibility: ${props => props.editMode ? 'visible' : 'hidden'};
`;

const TrackerView = props => {
    const {
        onChange,
        submitEdits,
        selectedTracker,
        confirmationToggle,
        editMode,
        editModeToggle,
        updateTrackers,
    } = props;
    const data = [selectedTracker.amount_driven, selectedTracker.fuel, selectedTracker.limit];
    const trackerName = ['amount_driven', 'fuel', 'limit'];
    const trackerIcons = [<GiSteeringWheel />, <RiGasStationFill />, <AiFillCar />];
    const percent = (selectedTracker.amount_driven / selectedTracker.limit) * 100;
    return (
        <TrackerContainer
            editMode={editMode}
            className="trackerView"
        >
            <TopIconContainer>
                <EditButton
                    onClick={editModeToggle}
                    editMode={editMode}
                >
                    <GoPencil />
                </EditButton>
                <Percent className="percentLimit">Limit reached: {percent.toFixed(0)}%</Percent>
                <TrashCan
                    editMode={editMode}
                    onClick={() => confirmationToggle(true)}
                >
                    <BsFillTrashFill
                        onClick={() => confirmationToggle(true)}
                    />
                </TrashCan>
            </TopIconContainer>
            <LineContainer>
                <Line
                    percent={percent}
                    strokeWidth="4"
                    strokeColor={green}
                />
            </LineContainer>
            {
                data.map((stat, i) => {
                    const titles = ['Amount Driven', 'Fuel Used', 'Driving Limit'];
                    return (
                        <CardContainer key={`${trackerName[i]}Container`} className={`${trackerName[i]}Container`}>
                            <StatContainer>
                                <Label key={`${trackerName[i]}Title`} className={`${stat}Text`}>{titles[i]}</Label>

                                {
                                    editMode
                                        ?
                                        <Input
                                            name={trackerName[i]}
                                            onChange={e => onChange(e)}
                                            placeholder={`${titles[i]}`}
                                            type="text"
                                            className={`${titles[i]}EditInput`}
                                            minWidth="200px"
                                            value={updateTrackers[trackerName[i]]}
                                            width="50%"
                                        />
                                        :
                                        <Stat className={`${titles[i]}Value`}>{stat}</Stat>
                                }
                            </StatContainer>
                            <TrackerIconWrapper>
                                {trackerIcons[i]}
                            </TrackerIconWrapper>
                        </CardContainer>
                    );
                })
            }

            <ButtonsEditMode className="editModeButtons">
                <EditButtonContainer onClick={editModeToggle} className="editModeButton">
                </EditButtonContainer>
                {
                    editMode
                        ?
                        <GeneralButton
                            animation={true}
                            color={white}
                            margin="20px auto 0 auto"
                            background={updateTrackers.amount_driven ? green : medGrey}
                            onClick={e => updateTrackers.amount_driven ? submitEdits(e) : null}
                            className="submitEditsButton"
                            width="100%"
                        >
                            Save
                            </GeneralButton>
                        :
                        null
                }
            </ButtonsEditMode>
        </TrackerContainer>
    );
};

const { func, bool, object } = PropTypes;
TrackerView.propTypes = {
    onChange: func.isRequired,
    submitEdits: func.isRequired,
    selectedTracker: object.isRequired,
    confirmationToggle: func.isRequired,
    editMode: bool.isRequired,
    editModeToggle: func.isRequired,
    updateTrackers: object.isRequired,
};

export default TrackerView;