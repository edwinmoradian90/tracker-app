import React, { useState } from 'react';
import SignupView from './SignupView';
import axios from 'axios';

const Signup = () => {
    const url = "http://localhost:3001/signup";
    const [correctPassword, setCorrectPassword] = useState(true);
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });
    const onSignup = e => {
        e.preventDefault();
        console.log(state)
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
            axios.post(url, user)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } else {
            setCorrectPassword(false);
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
            />
        </div>
    );
};

export default Signup;