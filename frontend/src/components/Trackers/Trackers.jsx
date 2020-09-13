import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrackerView from './TrackersView';

const Trackers = props => {
    const url = "http://localhost:3001/logged_in"
    useEffect(() => {
        axios.get(url)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="trackers">
            <TrackerView />
        </div>
    );
};

export default Trackers;