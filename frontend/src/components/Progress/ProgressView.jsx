import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Circle } from 'rc-progress';
import {
    green,
    blue,
    medGrey,
    black,
    white
} from '../../utils/colors/main';
import { cleanDate } from '../../utils/generalHelpers';
import { GoPencil } from 'react-icons/go';
import { AiFillCar } from 'react-icons/ai';
import { RiGasStationFill } from 'react-icons/ri';
import { GiSteeringWheel } from 'react-icons/gi';
import { BsFillTrashFill } from 'react-icons/bs';

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

const Totals = styled.div`
    animation: ${dropdown} .7s 1;
    background: ${white};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin: 20px auto;
    opacity: .7;
    width: 80%;
`;

const TotalContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TotalLabel = styled.label`
    color: ${medGrey};
    font-size: 12px;
    font-weight: 300;
    opacity: .7;
`;

const TotalStat = styled.div`
    color: ${black};
    font-size: 16px;
    margin-top: 20px;
    opacity: .7;
`;

const IconContainer = styled.div`
    color: ${blue};
    font-size: 30px;
`;

const ProgressVisuals = styled.div`
    background: ${white};
    border-radius: 5px;
    height: 100px;
    padding: 40px 120px;
    margin: 20px auto 0 auto;
    opacity: .8;
    width: 100px;
`;

const LimitLabel = styled.label`
    color: ${medGrey};
    font-size: 12px;
    font-weight: 300;
    opacity: .7;
    padding: 20px;
`;

const Percent = styled.div`
   color: ${blue};
   bottom: 62%;
   left: 38%;
   opacity: .7;
   position: relative;
`;

const ProgressView = props => {
    const { trackers, state, addToValue, value } = props;
    const { totalFuelUsed, totalAmountDriven, totalDrivingLimit } = state;
    const firstTrackerDate = cleanDate(trackers[trackers.length - 1].created_at);
    const percent = (totalAmountDriven / totalDrivingLimit) * 100;

    let progressData = [];

    const progressDataset = (name, text, unit, stat, startDate, icon) => {
        const data = {
            name, text, unit, stat, startDate, icon
        };
        progressData.push(data);
        return data;
    };

    progressDataset(
        "totalAmountDriven",
        "Total amount driven since ",
        "km",
        totalAmountDriven,
        firstTrackerDate,
        <GiSteeringWheel />,
    );
    progressDataset(
        "totalFuelUsed",
        "Total amount of fuel used since ",
        "liters",
        totalFuelUsed,
        firstTrackerDate,
        <RiGasStationFill />,
    );
    progressDataset(
        "totalDrivingLimit",
        "Total driving limit since ",
        "km",
        totalDrivingLimit,
        firstTrackerDate,
        <AiFillCar />,
    );

    return (
        <div className="progressView">
            <div className="progressStats">
                {
                    progressData.length > 0 ? progressData.map(dataItem => {
                        const { name, text, unit, stat, startDate, icon } = dataItem;
                        return (
                            <Totals key={name}>
                                <TotalContainer className="totalContainer">
                                    <TotalLabel className={`${name}Text`}>{text}{startDate}</TotalLabel>
                                    <TotalStat className={`${name}Stat`}>{stat} {unit}</TotalStat>
                                </TotalContainer>
                                <IconContainer>
                                    {icon}
                                </IconContainer>
                            </Totals>
                        );
                    })
                        :
                        null
                }
            </div>
            <LimitLabel>Total driving limit reached: {percent.toFixed(0)}%</LimitLabel>
            <ProgressVisuals className="progressVisuals">
                <Circle
                    strokeWidth="4"
                    strokeColor={blue}
                    percent={percent}
                />
                <Percent>{percent.toFixed(0)}%</Percent>
            </ProgressVisuals>
        </div>
    );
};

export default ProgressView;