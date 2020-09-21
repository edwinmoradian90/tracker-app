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
import { GeneralButton } from '../../utils/styles/generalStyles';

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
        opacity: .7;
    }
`;

const grow = keyframes`
    from { 
        padding: 0px 10px;
    }

    to {
        padding: 0px 0px;
    }
`;

const TrackerContainer = styled.div`
    padding-top: 20px;
    height: calc(812px - 117.5px);
`;

const TopIconContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 10px;
`;

const CardContainer = styled.div`
    animation: ${dropdown} .7s 1;
    align-items: center;
    border-radius: 4px;
    background: ${white};
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    padding: 20px 10px;
    width: 320px;
`;

const Percent = styled.div`
    animation: ${fadein} .7s 1;
    color: ${medGrey};
    font-size: 12px;
    margin-bottom: 5px;
    opacity: .7;
`;

const LineContainer = styled.div`
    margin: auto;
    opacity: .9;
    width: 340px;
`;

const StatContainer = styled.div`
    padding-left: 20px;
`;

const Label = styled.p`
    color: ${medGrey};
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 10px;
    opacity: .7;
`;

const Stat = styled.p`
    color: ${black};
    font-size: 16px;
    font-weight: 300;
    opacity: .8;
    padding: 7.5px 0px;
`;

const Input = styled.input`
    animation: ${grow} .7s 1;
    color: ${medGrey};
`;

const TrackerIconWrapper = styled.div`
    color: ${blue};
    font-size: 30px;
    padding-right: 20px;
`;

const EditButtonContainer = styled.div`
    max-width: 375px;
    width: 375px;
`;

const EditButton = styled.div`
    animation: ${fadein} .7s 1;
    align-items: center;
    color: ${props => props.editMode ? blue : 'lightgrey'};
    font-size: 25px;
    opacity: .7;
`;

const TrashCan = styled.span`
    animation: ${fadein} 1s 1;
    color: ${warningRed};
    font-size: 23px;
    opacity: .7;
    visibility: ${props => props.editMode ? 'visible' : 'hidden'}
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
        <TrackerContainer className="trackerView">
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
                                            value={updateTrackers[trackerName[i]]}
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

            <div className="editModeButtons">
                <EditButtonContainer onClick={editModeToggle} className="editModeButton">
                </EditButtonContainer>
                {
                    editMode
                        ?
                        <GeneralButton
                            color={white}
                            margin="20px auto 0 auto"
                            width="320px"
                            background={updateTrackers.amount_driven ? green : medGrey}
                            onClick={e => updateTrackers.amount_driven ? submitEdits(e) : null}
                            className="submitEditsButton"
                        >
                            Save
                            </GeneralButton>
                        :
                        null
                }
            </div>
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