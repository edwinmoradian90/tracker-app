import React from 'react';
import { Link } from 'react-router-dom';
import { cleanDate } from '../../utils/generalHelpers';

const TrackersView = props => {
    const { trackers } = props;
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