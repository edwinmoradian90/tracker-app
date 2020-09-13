import React from 'react';

const TrackerView = props => {
    const { selectedTracker, editTracker, closeTrackerEditor, state } = props;
    console.log(state)
    return (
        <div className="trackerView">
            <div
                name="fuel"
                onClick={e => editTracker(e)}
                className="fuel"
            >
                {
                    !state.fuel
                        ?
                        selectedTracker.fuel
                        :
                        <>
                            <input
                                placeholder="Fuel Used"
                                className="fuelEditInput"
                                type="text"
                            />
                            <button
                                className="fuel"
                                onClick={e => closeTrackerEditor(e)}
                            >
                                Done!
                            </button>
                        </>
                }
                <p className="fuelText">Fuel Used</p>
            </div>
            <div
                name="limit"
                onClick={e => editTracker(e)}
                className="limit"
            >
                {selectedTracker.limit}
                <p className="limitText">Driving Limit</p>
            </div>
            <div
                name="amountDriven"
                onClick={e => editTracker(e)}
                className="amountDriven"
            >
                {selectedTracker.amount_driven}
                <p className="amountDrivenText">Amount Driven</p>
            </div>
        </div>
    );
};

export default TrackerView;