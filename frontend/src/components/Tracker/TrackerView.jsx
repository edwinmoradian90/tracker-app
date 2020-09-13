import React from 'react';

const TrackerView = props => {
    const { selectedTracker } = props;
    return (
        <div className="trackerView">
            fuel
            {selectedTracker.fuel}
            limit
            {selectedTracker.limit}
        </div>
    );
};

export default TrackerView;