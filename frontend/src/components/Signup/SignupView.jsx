import React from 'react';
import { Link } from 'react-router-dom';

const SignupView = props => {
    const { onChange, onSignup, correctPassword } = props;
    return (
        <div className="signupView">
            <h3 className="signupTitle">Sign up to Tracker App today.</h3>
            <p className="returningUserLogin">
                Already a user? {" "}
                <Link to="/login">
                    Log in.
                </Link>
            </p>
            <div className="signupInputContainer">
                <input
                    name="firstName"
                    onChange={e => onChange(e)}
                    type="text"
                    className="signupFirstName"
                    placeholder="First Name"
                />
                <input
                    name="lastName"
                    onChange={e => onChange(e)}
                    type="text"
                    className="signupLastName"
                    placeholder="Last Name"
                />
                <input
                    name="email"
                    onChange={e => onChange(e)}
                    type="email"
                    className="signupEmail"
                    placeholder="Email"
                />
                <input
                    name="password"
                    onChange={e => onChange(e)}
                    type="password"
                    className="signupPassword"
                    placeholder="Password"
                />
                <input
                    name="passwordConfirmation"
                    onChange={e => onChange(e)}
                    type="password"
                    className="signupPasswordConfirmation"
                    placeholder="Password Confirmation"
                />
            </div>
            <button onClick={e => onSignup(e)} className="signupSubmit">
                Sign up
            </button>
            {
                correctPassword
                    ?
                    null
                    :
                    <p className="incorrectPassword">Passwords do not match.</p>
            }
        </div>
    );
};

export default SignupView;