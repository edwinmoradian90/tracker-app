import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GeneralButton } from '../../utils/styles/generalStyles';
import { green, medGrey, white } from '../../utils/colors/main';
import { fadein } from '../../utils/styles/generalStyles';

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const SignupTitle = styled.div`
    margin: 20px 0px;
`;

const NewUser = styled.p`
    animation: ${fadein} 1.5s 1;
    color: ${medGrey};
    margin: 10px auto;
    opacity: .7;
`;

const InputContainer = styled.div`
    margin-bottom: 10px;
`;

const Input = styled.input`
    margin-bottom: ${props => props.marginBottom};
    width: 94%;
`;

const SignupView = props => {
    const { onChange, onSignup, correctPassword, state } = props;
    const {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
    } = state;

    const checkForm = () => {
        if (
            firstName && lastName
            && email && password &&
            passwordConfirmation
        ) {
            return true;
        } else {
            return false;
        };
    };
    return (
        <SignupContainer className="signupView">
            <SignupTitle className="signupTitle">Sign up to Tracker App today.</SignupTitle>
            <InputContainer className="signupInputContainer">
                <Input
                    marginBottom="20px"
                    name="firstName"
                    onChange={e => onChange(e)}
                    type="text"
                    className="signupFirstName"
                    placeholder="First Name"
                />
                <Input
                    name="lastName"
                    marginBottom="20px"
                    onChange={e => onChange(e)}
                    type="text"
                    className="signupLastName"
                    placeholder="Last Name"
                />
                <Input
                    marginBottom="20px"
                    name="email"
                    onChange={e => onChange(e)}
                    type="email"
                    className="signupEmail"
                    placeholder="Email"
                />
                <Input
                    name="password"
                    marginBottom="20px"
                    onChange={e => onChange(e)}
                    type="password"
                    className="signupPassword"
                    placeholder="Password"
                />
                <Input
                    marginBottom="20px"
                    name="passwordConfirmation"
                    onChange={e => onChange(e)}
                    type="password"
                    className="signupPasswordConfirmation"
                    placeholder="Password Confirmation"
                />
            </InputContainer>
            <GeneralButton
                background={() => checkForm() ? green : medGrey}
                color={white}
                onClick={() => checkForm() ? onSignup() : null}
                className="signupSubmit"
            >
                Sign up
            </GeneralButton>
            <NewUser className="returningUserLogin">
                Already a user? {" "}
                <Link to="/login">
                    Log in.
                </Link>
            </NewUser>
            {
                correctPassword
                    ?
                    null
                    :
                    <p className="incorrectPassword">Passwords do not match.</p>
            }
        </SignupContainer >
    );
};

const { func, object, bool } = PropTypes;
SignupView.propTypes = {
    onChange: func.isRequired,
    onSignup: func.isRequired,
    correctPassword: bool.isRequired,
    state: object.isRequired,
}

export default SignupView;