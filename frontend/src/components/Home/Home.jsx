import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { currentUser } from '../../redux/actions/sessions';
import Loading from '../Loading/Loading';
import HomeView from './HomeView';

const Home = props => {
    const url = "http://localhost:3001/trackers"
    const dispatch = useDispatch();
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
        } else {
            props.history.push('/login');
        };
    }, []);
    const user = useSelector(state => state.sessions.currentUser);
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
                if (res.data.status === 200) {
                    setTrackerCreated(true);
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
        <HomeView
            onChange={onChange}
            submitTrackerForm={submitTrackerForm}
            trackerCreated={trackerCreated}
        />
    );
};

export default withRouter(Home);