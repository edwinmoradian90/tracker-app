import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Line } from 'rc-progress';
import {
    blue,
    medGrey,
    black,
    white,
    green
} from '../../utils/colors/main';
import { cleanDate } from '../../utils/helpers/generalHelpers';
import { AiFillCar } from 'react-icons/ai';
import { RiGasStationFill } from 'react-icons/ri';
import { GiSteeringWheel } from 'react-icons/gi';

const dropdown = keyframes`
    from { 
        margin-bottom: 300px;
        opacity: 0;
    }

    to {
        margin-bottom: 0;
        opacity: .9;
    }
`;

const ProgressViewContainer = styled.section`
    height: 100%;
    margin-top: 20px;
    width: 100%;
`;

const Totals = styled.div`
    animation: ${dropdown} .7s 1;
    background: ${white};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin: 20px auto;
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
    opacity: .9;
`;

const TotalStat = styled.div`
    color: ${black};
    font-size: 16px;
    font-weight: 300;
    margin-top: 20px;
    opacity: .9;
`;

const IconContainer = styled.div`
    color: ${blue};
    font-size: 30px;
`;

const ProgressVisuals = styled.div`
    box-sizing: border-box;
    opacity: .9;
    padding: 20px 20px 0 20px;
    width: 100%;
`;

const LimitLabel = styled.label`
    color: ${medGrey};
    font-size: 12px;
    font-weight: 300;
    opacity: .9;
    margin-top: 20px;
    padding: 20px;
`;

const NoProgress = styled.div`
    color: ${medGrey};
    display: flex;
    justify-content: center;
    margin-top: 20px;
    opacity: .9;
`;

const ProgressView = props => {
    const { trackers, state } = props;
    const { totalFuelUsed, totalAmountDriven, totalDrivingLimit } = state;
    const firstTrackerDate = trackers.length > 0 ? cleanDate(trackers[trackers.length - 1].created_at) : null;
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
        <ProgressViewContainer className="progressView">
            { trackers.length > 0
                ?
                <>
                    <LimitLabel>Total driving limit reached: {percent.toFixed(0)}%</LimitLabel>
                    <ProgressVisuals className="progressVisuals">
                        <Line
                            strokeWidth="4"
                            strokeColor={green}
                            percent={percent}
                        />
                    </ProgressVisuals>
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
                                : null
                        }
                    </div>
                </>
                :
                <NoProgress>You haven't made any progress...yet.</NoProgress>
            }
        </ProgressViewContainer>
    );
};

const { object, array } = PropTypes;
ProgressView.propTypes = {
    trackers: array,
    state: object,
};

export default ProgressView;