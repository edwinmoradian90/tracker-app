import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currentUser } from '../../redux/actions/sessions';
import { getHeaders } from '../../utils/generalHelpers';
import SignupView from './SignupView';

const Signup = props => {
    const dispatch = useDispatch();
    const url = "http://localhost:3001/signup";
    const [correctPassword, setCorrectPassword] = useState(true);
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });
    const onSignup = () => {
        console.log('signing up ');
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
        } = state;
        if (passwordConfirmation === password) {
            console.log('passwords match')
            const user = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            };
            axios.post(url, { user })
                .then(res => {
                    console.log(res)
                    const { data } = res;
                    if (data.jwt) {
                        const url = 'http://localhost:3001/login';
                        const token = `Bearer ${data.jwt}`;
                        const headers = {
                            'Authorization': token,
                        };
                        axios.post(url, { user }, { headers })
                            .then(res => {
                                console.log(res);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        const {
                            first_name,
                            last_name,
                            email,
                            id,
                            created_at,
                            updated_at,
                        } = data.user;
                        const userInfo = {
                            firstName: first_name,
                            lastName: last_name,
                            email: email,
                            id: id,
                            createdAt: created_at,
                            updatedAt: updated_at,
                            token: `Bearer ${data.jwt}`,
                        };
                        localStorage.setItem('currentUser', JSON.stringify(userInfo));
                        dispatch(currentUser(userInfo));
                        props.history.push('/');
                    }
                })
                .catch(err => console.log(err));
        } else {
            setCorrectPassword(false);
            console.log('not working')
        };
    }
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div className="signup">
            <SignupView
                onChange={onChange}
                onSignup={onSignup}
                correctPassword={correctPassword}
                state={state}
            />
        </div>
    );
};

export default withRouter(Signup);