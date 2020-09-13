import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TrackerView from '../Tracker/TrackerView';

const Tracker = props => {
    const trackers = useSelector(state => state.trackers.trackers);
    const id = props.match.params.id;
    const selectedTracker = trackers[id - 1];
    console.log(trackers, id)
    return (
        <div className="tracker">
            <TrackerView
                selectedTracker={selectedTracker}
            />
        </div>
    );
};

export default withRouter(Tracker);