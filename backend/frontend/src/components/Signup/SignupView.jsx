import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GeneralButton, Input } from '../../utils/styles/generalStyles';
import { green, medGrey, white, warningRed } from '../../utils/colors/main';
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
    height: 100%;
`;

const Error = styled.p`
    color: ${warningRed};
    display: flex;
    visibility: ${props => props.incorrectData ? 'auto' : 'hidden'};
    font-size: 14px;
    font-weight: 300;
    margin: 0 0 20px 0;
`;

const SignupView = props => {
    const {
        onChange,
        onSignup,
        incorrectData,
        state,
        validations,
    } = props;
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
            passwordConfirmation &&
            passwordConfirmation.length >= 6
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
                    width="100%"
                />
                <Input
                    name="lastName"
                    marginBottom="20px"
                    onChange={e => onChange(e)}
                    type="text"
                    className="signupLastName"
                    placeholder="Last Name"
                    width="100%"
                />
                <Input
                    marginBottom="20px"
                    name="email"
                    onChange={e => onChange(e)}
                    type="email"
                    className="signupEmail"
                    placeholder="Email"
                    width="100%"
                />
                <Input
                    name="password"
                    marginBottom="20px"
                    onChange={e => onChange(e)}
                    type="password"
                    className="signupPassword"
                    placeholder="Password"
                    width="100%"
                />
                <Input
                    marginBottom="20px"
                    name="passwordConfirmation"
                    onChange={e => onChange(e)}
                    type="password"
                    className="signupPasswordConfirmation"
                    placeholder="Password Confirmation"
                    width="100%"
                />
            </InputContainer>
            <Error incorrectData={incorrectData}>
                {validations.validation}
            </Error>
            <GeneralButton
                animation={true}
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
        </SignupContainer >
    );
};

const { func, object, bool } = PropTypes;
SignupView.propTypes = {
    onChange: func.isRequired,
    onSignup: func.isRequired,
    incorrectData: bool.isRequired,
    state: object.isRequired,
    validations: object.isRequired,
}

export default SignupView;