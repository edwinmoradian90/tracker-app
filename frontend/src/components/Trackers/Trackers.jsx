import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userTrackers } from '../../redux/actions/trackers';
import TrackersView from './TrackersView';

const Trackers = props => {
    const dispatch = useDispatch();
    const url = "http://localhost:3001/trackers";
    const userInfo = JSON.parse(localStorage.getItem("currentUser")) || "";
    const token = userInfo.token;
    console.log(token);
    const headers = {
        "Authorization": token
    };
    const [trackers, setTrackers] = useState("");
    useEffect(() => {
        if (token) {
            axios.get(url, { headers })
                .then(res => {
                    dispatch(userTrackers(res.data.trackers));
                    setTrackers(res.data.trackers);
                    console.log(token);
                })
                .catch(err => console.log(err));
        } else {
            props.history.push('/login');
        }
    }, [token]);
    return (
        <div className="trackers">
            <TrackersView
                trackers={trackers}
            />
        </div>
    );
};

export default withRouter(Trackers);