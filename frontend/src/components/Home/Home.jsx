import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { currentUser } from '../../redux/actions/sessions';
import { delayLoading } from '../../utils/generalHelpers';
import Loading from '../Loading/Loading';
import HomeView from './HomeView';
import Header from '../Header/Header';
import { blue } from '../../utils/colors/main';

const Home = props => {
    const url = "http://localhost:3001/trackers";
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
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('currentUser'));
        if (userInfo) {
            const token = userInfo.token;
            dispatch(currentUser(userInfo));
            setToken(token);
            delayLoading(1000, setLoading, false);
        } else {
            props.history.push('/login');
            setLoading(false);
        };
    }, []);
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const submitTrackerForm = e => {
        e.preventDefault();
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
        axios.post(url, { tracker }, { headers })
            .then(res => {
                const { status } = res.data;
                console.log("Status", status)
                if (status === 200) {
                    setTrackerCreated(true);
                } else if (status === 404) {
                    props.history.push("/login");
                }
                setState({
                    amountOfFuel: "",
                    amountDriven: "",
                    drivingLimit: "",
                });
            })
            .catch(err => console.log(err));
    };

    return (
        loading
            ?
            <Loading />
            :
            <div className="home">
                <Header
                    pageName={pageName}
                />
                <HomeView
                    onChange={onChange}
                    submitTrackerForm={submitTrackerForm}
                    trackerCreated={trackerCreated}
                />
            </div>
    );
};

export default withRouter(Home);