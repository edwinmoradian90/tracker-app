import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { currentUser } from '../../redux/actions/sessions';
import { authHeader, getCurrentUser, getHeaders, getToken, removeCurrentUser } from '../../utils/helpers/sessionHelpers';
import { delayLoading, checkTypedIsNumber } from '../../utils/helpers/generalHelpers';
import Loading from '../Loading/Loading';
import HomeView from './HomeView';
import Header from '../Header/Header';

const Home = props => {
    const url = "/trackers";
    const pageName = "Add stat";
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        amountOfFuel: "",
        amountDriven: "",
        drivingLimit: "",
    });
    const [token, setToken] = useState("");
    const [trackerCreated, setTrackerCreated] = useState(false);
    const [notANumber, setNotANumber] = useState(false);
    const [submitForm, setSubmitForm] = useState(false);
    useEffect(() => {
        const headers = getHeaders();
        const user = getCurrentUser();
        axios.get('/user_is_authed', { headers })
            .then(res => {
                const { status } = res.data;
                if (status === 200) {
                    dispatch(currentUser(user));
                    delayLoading(1000, setLoading, false);
                } else {
                    removeCurrentUser();
                    props.history.push('/login');
                    setLoading(false);
                };
            })
    }, []);
    const onChange = e => {
        e.preventDefault();
        if (submitForm) {
            setSubmitForm(false);
        };
        if (checkTypedIsNumber(e.target.value)) {
            if (notANumber) {
                setNotANumber(false);
            };
            setState({
                ...state,
                [e.target.name]: e.target.value
            });
        } else {
            if (!notANumber) {
                setNotANumber(true);
            };
        };
    };

    const submitTrackerForm = e => {
        e.preventDefault();
        if (!submitForm) {
            setSubmitForm(true);
        };
        const {
            amountOfFuel,
            amountDriven,
            drivingLimit,
        } = state;
        const tracker = {
            fuel: amountOfFuel || 0.0,
            amount_driven: amountDriven || 0.0,
            limit: drivingLimit || 0.0,
        };
        const headers = {
            "Authorization": token
        };
        if (trackerCreated) {
            setTrackerCreated(false);
            setState({
                amountOfFuel: "",
                amountDriven: "",
                drivingLimit: "",
            });
            return;
        };
        axios.post(url, { tracker }, { headers })
            .then(res => {
                const { status } = res.data;
                if (status === 200) {
                    setTrackerCreated(true);
                    setSubmitForm(false);
                } else if (status === 404) {
                    props.history.push("/login");
                };
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Header
                pageName={pageName}
            />
            {
                loading
                    ?
                    <Loading />
                    :
                    <div className="home">
                        <HomeView
                            onChange={onChange}
                            submitTrackerForm={submitTrackerForm}
                            trackerCreated={trackerCreated}
                            notANumber={notANumber}
                            state={state}
                            submitForm={submitForm}
                        />
                    </div>
            }
        </>
    );
};

export default withRouter(Home);