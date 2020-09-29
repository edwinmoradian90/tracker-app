import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userTrackers } from '../../redux/actions/trackers';
import TrackersView from './TrackersView';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import { delayLoading } from '../../utils/helpers/generalHelpers';
import { getHeaders } from '../../utils/helpers/sessionHelpers';

const Trackers = props => {
    const pageName = "Track it";
    const url = "/trackers";
    const [trackers, setTrackers] = useState("");
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const headers = getHeaders();
    useEffect(() => {
        if (headers['Authorization']) {
            axios.get(url, { headers })
                .then(res => {
                    if (res.data.status === 200) {
                        dispatch(userTrackers(res.data.trackers));
                        setTrackers(res.data.trackers);
                        delayLoading(1000, setLoading, false);
                    } else if (res.data.status === 404) {
                        delayLoading(1000, props.history.push, '/login');
                    }
                })
                .catch(err => console.log(err));
        } else {
            setLoading(false);
            props.history.push('/login');
        }
    }, []);
    return (

        <div className="trackers">
            <Header
                pageName={pageName}
            />
            {
                loading
                    ?
                    <Loading />
                    :
                    <TrackersView
                        trackers={trackers}
                    />
            }
        </div>
    );
};

export default withRouter(Trackers);