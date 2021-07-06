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
        defaultError: 'Please check your information for errors.',
        emailError: 'Email already taken.',
    };
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });
    const [submitForm, setSubmitForm] = useState(false);
    const [incorrectData, setIncorrectData] = useState({
        defaultError: false,
        emailError: false,
    });
    const onSignup = () => {
        if (!submitForm) {
            setSubmitForm(true);
        };
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
        } = state;
        if (passwordConfirmation === password) {
            const user = {
                first_name: firstName.toLowerCase(),
                last_name: lastName.toLowerCase(),
                email: email.toLowerCase(),
                password: password.toLowerCase(),
                admin: false,
            };
            axios.post(url, { user })
                .then(res => {
                    const { data } = res;
                    const { status } = res.data;
                    if (data.jwt && status === 200) {
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
                    } else if (status === 409) {
                        setIncorrectData({
                            emailError: true,
                            defaultError: false,
                        });
                        setSubmitForm(false);
                    } else if (status === 500) {
                        setIncorrectData({
                            emailError: false,
                            defaultError: true,
                        });
                        setSubmitForm(false);
                    };
                })
                .catch(err => console.log(err));
        } else {
            setIncorrectData({
                emailError: false,
                defaultError: true,
            });
        };
    }
    const onChange = e => {
        if (incorrectData.emailError || incorrectData.defaultError) {
            setIncorrectData({
                defaultError: false,
                emailError: false,
            });
        };
        if (submitForm) {
            setSubmitForm(false);
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
                submitForm={submitForm}
                incorrectData={incorrectData}
                validations={validations}
                state={state}
            />
        </div>
    );
};

export default withRouter(Signup);