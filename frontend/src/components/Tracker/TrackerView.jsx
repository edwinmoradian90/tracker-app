import React from 'react';
import styled, { keyframes } from 'styled-components';
import { GoPencil } from 'react-icons/go';
import { AiFillCar } from 'react-icons/ai';
import { RiGasStationFill } from 'react-icons/ri';
import { GiSteeringWheel } from 'react-icons/gi';
import {
    black,
    medGrey,
    lightGrey,
    grey,
    blue,
    green,
    white,
} from '../../utils/colors/main';
import { GeneralButton } from '../../utils/styles/generalStyles';

const dropdown = keyframes`
    from { 
        margin-bottom: 300px;
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
        opacity: 1;
    }
`;

const TrackerContainer = styled.div`
    padding-top: 80px;
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
    width: 85vw;
`;

const StatContainer = styled.div`
    padding-left: 20px;
`;

const Label = styled.p`
    color: ${medGrey};
    margin-bottom: 10px;
`;

const Stat = styled.p`
    padding: 7.5px 0px;
`;

const TrackerIconWrapper = styled.div`
    color: ${blue};
    font-size: 35px;
    padding-right: 20px;
`;

const EditButton = styled.div`
    animation: ${fadein} .7s 1;
    align-items: center;
    color: ${props => props.editMode ? blue : 'lightgrey'};
    font-size: 30px;
    padding: 20px;
    position: fixed;
    right: 3%;
    top: 6%;
`;

const TrackerView = props => {
    const {
        onChange,
        submitEdits,
        selectedTracker,
        editMode,
        editModeToggle,
        updateTrackers,
    } = props;
    const data = [selectedTracker.limit, selectedTracker.fuel, selectedTracker.amount_driven];
    const trackerName = ['limit', 'fuel', 'amount_driven'];
    const trackerIcons = [<AiFillCar />, <RiGasStationFill />, <GiSteeringWheel />];
    return (
        <TrackerContainer className="trackerView">
            {
                data.map((stat, i) => {
                    const titles = ['Driving Limit', 'Fuel Used', 'Amount Driven'];
                    return (
                        <CardContainer key={`${trackerName[i]}Container`} className={`${trackerName[i]}Container`}>
                            <StatContainer>
                                <Label key={`${trackerName[i]}Title`} className={`${stat}Text`}>{titles[i]}</Label>

                                {
                                    editMode
                                        ?
                                        <input
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
                <div onClick={editModeToggle} className="editModeButton">
                    <EditButton editMode={editMode}>
                        <GoPencil />
                    </EditButton>
                </div>
                {
                    editMode
                        ?
                        <GeneralButton
                            color={white}
                            margin="3vh auto 0 auto"
                            width="85vw"
                            background={updateTrackers.amount_driven ? green : grey}
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

export default TrackerView;