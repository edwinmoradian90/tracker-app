import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userTrackers } from '../../redux/actions/trackers';
import axios from 'axios';
import TrackerView from '../Tracker/TrackerView';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import { getToken } from '../../utils/sessionHelpers';

const Tracker = props => {
    const pageName = "Track it";
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        amountDriven: false,
        limit: false,
        fuel: false,
    });
    useEffect(() => {
        const url = "http://localhost:3001/trackers";
        const token = getToken();
        const headers = {
            "Authorization": token,
        };
        axios.get(url, { headers })
            .then(res => {
                console.log(res)
                if (res.data.status === 200) {
                    dispatch(userTrackers(res.data.trackers));
                    setLoading(false);
                } else if (res.data.status === 404) {
                    props.history.push("/login");
                };
            })
            .catch(err => console.log(err));

    }, []);
    const trackers = useSelector(state => state.trackers.trackers);
    const selectedTracker = trackers[id - 1];
    const editTracker = e => {
        const name = e.target.className;
        console.log(name)
        setState({
            ...state,
            [name]: true
        });
    };
    const closeTrackerEditor = e => {
        const name = e.target.className;
        setState({
            ...state,
            [name]: false
        });
    };

    return (
        <div className="tracker">
            <Header
                pageName={pageName}
            />
            {
                loading
                    ?
                    <Loading />
                    :
                    <TrackerView
                        state={state}
                        editTracker={editTracker}
                        closeTrackerEditor={closeTrackerEditor}
                        selectedTracker={selectedTracker}
                    />
            }
        </div>
    );
};

export default withRouter(Tracker);