import React from 'react';
import styled from 'styled-components';
import { Circle } from 'rc-progress';
import {
    green,
    white
} from '../../utils/colors/main';
import { cleanDate } from '../../utils/generalHelpers';

const Totals = styled.div`
    background: ${white};
    border-radius: 5px;
    padding: 20px;
    margin: 20px auto;
    width: 75%;
`;

const ProgressView = props => {
    const { trackers, state } = props;
    const { totalFuelUsed, totalAmountDriven } = state;
    const firstTrackerDate = cleanDate(trackers[trackers.length - 1].created_at);
    console.log(totalAmountDriven)
    return (
        <div className="progressView">
            <Totals className="totalAmountDriven">
                <label className="totalAmountDrivenText">
                    Total amount driven since {firstTrackerDate}
                </label>
                <p className="totalAmoutDrivenStat">{totalAmountDriven}</p>
            </Totals>
            <Totals className="totalFuelUsed">
                <label className="totalFuelUsedText">Total fuel used</label>
                <p className="totalFuelUsedStat">{totalFuelUsed}</p>
            </Totals>
        </div>
    );
};

export default ProgressView;