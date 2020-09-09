import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import LoginView from './LoginView';
import axios from 'axios';

const Login = props => {
    const url = "http://localhost:3001/login"
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        console.log(state);
    };
    const onSubmit = e => {
        const { email, password } = state;
        const user = { email, password };
        axios.post(url, { user })
            .then(res => {
                const { data } = res;
                data.logged_in
                    ? props.history.push('/')
                    : console.log('error')
            })
            .catch(err => console.log(err));
    }
    return (
        <LoginView
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default withRouter(Login);