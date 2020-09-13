import React from 'react';
import { Link } from 'react-router-dom';

const TrackersView = props => {
    const { trackers } = props;
    const cleanDate = date => {
        return date.split('T')[0]
    };
    return (
        <div className="trackersView">
            <h3 className="trackersPageTitle">All recent trackers</h3>
            <ul className="allTrackers">
                {trackers ? trackers.map((tracker, i) => {
                    const { created_at, id } = tracker;
                    return (
                        <Link to={`/trackers/${id}`}>
                            <li key={i} className="trackerInfo">
                                {cleanDate(created_at)}
                            </li>
                        </Link>
                    );
                })
                    :
                    null
                }
            </ul>
        </div>
    );
};

export default TrackersView;