import React from 'react';
import { withRouter } from 'react-router-dom';

const HomeView = props => {
    const { onChange, submitTrackerForm, trackerCreated } = props;
    return (
        <div className="homeView">
            <div className="addStatFuelContainer">
                <input
                    name="amountOfFuel"
                    type="text"
                    className="addStatFuel"
                    placeholder="Amount of fuel"
                    onChange={e => onChange(e)}
                />
            </div>
            <div className="addStatAmountDrivenContainer">
                <input
                    name="amountDriven"
                    type="text"
                    className="addStatAmountDriven"
                    placeholder="Amount driven"
                    onChange={e => onChange(e)}
                />
            </div>
            <div className="addStatLimitContainer">
                <input
                    name="drivingLimit"
                    type="text"
                    className="addStatLimit"
                    placeholder="Driving limit"
                    onChange={e => onChange(e)}
                />
            </div>
            <button
                className="submitNewTracker"
                onClick={e => submitTrackerForm(e)}
            >
                Create new tracker
            </button>
            <button
                className="viewAllTrackers"
                onClick={() => props.history.push("/trackers")}
            >
                View all trackers
            </button>
            {
                trackerCreated
                    ?
                    <p className="trackerCreated">Tracker has been created!</p>
                    :
                    null
            }
        </div>
    );
};

export default withRouter(HomeView);