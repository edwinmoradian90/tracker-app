import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { currentUser } from '../../redux/actions/sessions';
import LoginView from './LoginView';
import axios from 'axios';

const Login = props => {
    const dispatch = useDispatch();
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
        e.preventDefault();
        const { email, password } = state;
        const user = { email, password };
        axios.post(url, user)
            .then(res => {
                const { data } = res;
                console.log(data)
                const token = data.jwt;
                const {
                    first_name,
                    last_name,
                    email,
                    updated_at,
                    created_at,
                    id,
                } = data.user;
                const userInfo = {
                    firstName: first_name,
                    lastName: last_name,
                    email: email,
                    updatedAt: updated_at,
                    createdAt: created_at,
                    id: id,
                    token: `Bearer ${token}`,
                };
                if (token) {
                    console.log('there is a token');
                    const newUrl = "http://localhost:3001/user_is_authed";
                    const headers = {
                        "Authorization": `Bearer ${token}`,
                    };
                    axios.get(newUrl, { headers })
                        .then(res => console.log('headers', res))
                        .catch(err => console.log(err));
                    localStorage.setItem('currentUser', JSON.stringify(userInfo));
                    dispatch(currentUser(userInfo));
                    props.history.push('/');
                };
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