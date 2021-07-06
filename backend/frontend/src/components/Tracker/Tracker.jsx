import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userTracker } from '../../redux/actions/trackers';
import axios from 'axios';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import TrackerView from '../Tracker/TrackerView';
import Confirmation from '../Confirmation/Confirmation';
import { trackerData } from '../../utils/confirmations/tracker/tracker';
import { getHeaders } from '../../utils/helpers/sessionHelpers';
import { delayLoading } from '../../utils/helpers/generalHelpers';

const Tracker = props => {
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const pageName = "Track it";
    const dispatch = useDispatch();
    const id = props.match.params.id;
    let selectedTracker = useSelector(state => state.trackers.tracker);
    const [tracker, setTracker] = useState("");
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [updateTrackers, setUpdateTrackers] = useState({
        fuel: selectedTracker.fuel,
        limit: selectedTracker.limit,
        amount_driven: selectedTracker.amount_driven,
    });
    const confirmation = trackerData[0];

    const deleteTracker = () => {
        dispatch(deleteTracker(id));
    };

    const confirmationToggle = bool => {
        setConfirmationOpen(bool || false);
    };

    const getTracker = () => {
        const url = `/trackers/${id}`;
        const headers = getHeaders();
        axios.get(url, { headers })
            .then(res => {
                if (res.data.status === 200) {
                    loadTracker(res);
                    delayLoading(1000, setLoading, false);
                } else if (res.data.status === 404) {
                    props.history.push("/login");
                };
            })
            .catch(err => console.log(err));
    };

    const loadTracker = res => {
        dispatch(userTracker(res.data.tracker));
        setTracker(res.data.tracker);
        selectedTracker = res.data.tracker;
    };

    const submitEdits = e => {
        e.preventDefault();
        const url = `/trackers/${id}`;
        const headers = getHeaders();
        const tracker = updateTrackers;
        axios.put(url, tracker, { headers })
            .then(res => {
                if (res.data.status === 200) {
                    setEditMode(false);
                };
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getTracker();
    }, [editMode]);

    const onChange = e => {
        setUpdateTrackers({
            ...updateTrackers,
            [e.target.name]: e.target.value
        });
    };
    const editModeToggle = () => {
        setEditMode(!editMode);
        const { fuel, amount_driven, limit } = selectedTracker;
        setUpdateTrackers({
            fuel,
            amount_driven,
            limit
        });
    };

    const redirectUser = () => {
        props.history.push('/trackers');
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
                    <>
                        <TrackerView
                            deleteTracker={deleteTracker}
                            confirmationToggle={confirmationToggle}
                            editMode={editMode}
                            editModeToggle={editModeToggle}
                            selectedTracker={selectedTracker}
                            onChange={onChange}
                            submitEdits={submitEdits}
                            updateTrackers={updateTrackers}
                            tracker={tracker}
                        />
                        <Confirmation
                            id={id}
                            confirmation={confirmation}
                            confirmationOpen={confirmationOpen}
                            confirmationToggle={confirmationToggle}
                            auxFunctions={redirectUser}
                        />
                    </>
            }
        </div>
    );
};

export default withRouter(Tracker);