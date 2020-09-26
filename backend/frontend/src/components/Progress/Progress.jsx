import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import ProgressView from './ProgressView';
import Loading from '../Loading/Loading';
import { getToken, removeCurrentUser } from '../../utils/helpers/sessionHelpers';
import { delayLoading } from '../../utils/helpers/generalHelpers';
import { userTrackers } from '../../redux/actions/trackers';

const Progress = props => {
    const pageName = 'Progress';
    const thingsToGet = [
        ['totalAmountDriven', 'amount_driven'],
        ['totalFuelUsed', 'fuel'],
        ['totalDrivingLimit', 'limit'],
    ];
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        totalAmountDriven: 0,
        totalFuelUsed: 0,
        totalDrivingLimit: 0,
    });
    let allUserTrackers = useSelector(state => state.trackers.trackers);

    const getTotal = (ids = [[]]) => {
        let newState = { ...state };
        if (allUserTrackers.length > 0 && allUserTrackers !== undefined) {
            ids.forEach(id => {
                let total = 0;
                allUserTrackers.forEach(tracker => {
                    total += tracker[id[1]]
                });
                const name = id[0];
                newState[name] = total;
                setState(newState);
            })
        };
    };

    const getTrackers = () => {
        const url = '/trackers';
        const token = getToken();
        const headers = { 'Authorization': token };
        if (!allUserTrackers.length > 0) {
            axios.get(url, { headers })
                .then(res => {
                    const { status, trackers } = res.data;
                    if (status === 200) {
                        allUserTrackers = allUserTrackers.length > 0
                            ? allUserTrackers
                            : (allUserTrackers = trackers, dispatch(userTrackers(trackers)));
                    };
                })
                .catch(err => console.log(err))
        };
    };

    useEffect(() => {
        const trackersUrl = '/trackers';
        const token = getToken();
        const headers = { 'Authorization': token };
        axios.get(trackersUrl, { headers })
            .then(res => {
                const { status } = res.data;
                if (status === 404) {
                    removeCurrentUser();
                    props.history.push('/login');
                } else if (status === 200) {
                    getTrackers();
                }
            })
            .catch(err => console.log(err));
        getTotal(thingsToGet);
        delayLoading(1000, setLoading, false);
    }, [allUserTrackers]);
    return (
        <div className="progress">
            <Header
                pageName={pageName}
            />
            {
                loading
                    ?
                    <Loading />
                    :
                    <ProgressView
                        trackers={allUserTrackers}
                        state={state}
                    />
            }
        </div>
    );
};

export default withRouter(Progress);