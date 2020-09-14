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
    useEffect(() => {
        const url = "http://localhost:3001/trackers";
        const token = getToken();
        const headers = {
            "Authorization": token,
        };
        axios.get(url, { headers })
            .then(res => {
                console.log(res);
                if (res.data.status === 200) {
                    dispatch(userTrackers(res.data.trackers));
                    setLoading(false);
                } else if (res.data.status === 404) {
                    props.history.push("/login");
                };
            })
            .catch(err => console.log(err));

    }, []);
    const pageName = "Track it";
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const trackers = useSelector(state => state.trackers.trackers);
    const selectedTracker = trackers[id - 1];
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [updateTrackers, setUpdateTrackers] = useState({
        fuel: selectedTracker.fuel,
        limit: selectedTracker.limit,
        amount_driven: selectedTracker.amount_driven,
    });
    const onChange = e => {
        setUpdateTrackers({
            ...updateTrackers,
            [e.target.name]: e.target.value
        });
        console.log(updateTrackers)
    };
    const editModeToggle = () => {
        setEditMode(!editMode);
    };
    const submitEdits = e => {
        e.preventDefault();
        const token = getToken();
        const url = `http://localhost:3001/trackers/${id}`;
        const headers = {
            "Authorization": token
        };
        const tracker = updateTrackers;
        axios.put(url, tracker, { headers })
            .then(res => {
                console.log(res);
                setEditMode(false);
            })
            .catch(err => console.log(err));
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
                        editMode={editMode}
                        editModeToggle={editModeToggle}
                        selectedTracker={selectedTracker}
                        onChange={onChange}
                        submitEdits={submitEdits}
                        updateTrackers={updateTrackers}
                    />
            }
        </div>
    );
};

export default withRouter(Tracker);