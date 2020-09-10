import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import HomeView from './HomeView';

const Home = props => {
    const url = "http://localhost:3001/logged_in"
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState('');
    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res)
                const { data } = res;
                const { logged_in, current_user } = data;
                if (logged_in) {
                    setLoading(false);
                    setCurrentUser(current_user);
                } else {
                    props.history.push('/login');
                }
            })
            .catch(err => console.log(err));
    }, [loading]);
    return (
        <HomeView />
    );
};

export default Home;