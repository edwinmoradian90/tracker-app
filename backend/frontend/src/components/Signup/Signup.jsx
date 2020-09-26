import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currentUser } from '../../redux/actions/sessions';
import SignupView from './SignupView';

const Signup = props => {
    const dispatch = useDispatch();
    const url = "/signup";
    const validations = {
        validation: 'Please check your information for errors.'
    };
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });
    const [incorrectData, setIncorrectData] = useState(false);
    const onSignup = () => {
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
        } = state;
        if (passwordConfirmation === password) {
            const user = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                admin: false,
            };
            axios.post(url, { user })
                .then(res => {
                    const { data } = res;
                    if (data.jwt) {
                        const url = '/login';
                        const token = `Bearer ${data.jwt}`;
                        const headers = {
                            'Authorization': token,
                        };
                        axios.post(url, { user }, { headers })
                            .then(res => {
                                return true;
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
                    } else {
                        setIncorrectData(true);
                    }
                })
                .catch(err => console.log(err));
        } else {
            setIncorrectData(true);
        };
    }
    const onChange = e => {
        if (incorrectData) {
            setIncorrectData(false);
        };
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
                incorrectData={incorrectData}
                validations={validations}
                state={state}
            />
        </div>
    );
};

export default withRouter(Signup);