import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { currentUser } from '../../redux/actions/sessions';
import Loading from '../Loading/Loading';
import HomeView from './HomeView';

const Home = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('currentUser'));
        if (userInfo) {
            dispatch(currentUser(userInfo));
        } else {
            props.history.push('/login');
        };
    }, []);
    const user = useSelector(state => state.sessions.currentUser);
    console.log(currentUser)

    return (
        <HomeView />
    );
};

export default withRouter(Home);