import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GeneralButton } from '../../utils/styles/generalStyles';
import { green, medGrey, white } from '../../utils/colors/main';

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const NewUser = styled.p`
    color: ${medGrey};
    opacity: .7;
    margin: 10px 0px;
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
            <h3 className="signupTitle">Sign up to Tracker App today.</h3>
            <NewUser className="returningUserLogin">
                Already a user? {" "}
                <Link to="/login">
                    Log in.
                </Link>
            </NewUser>
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
                onClick={() => checkForm() ? onSignup() : console.log('not working')}
                className="signupSubmit"
            >
                Sign up
            </GeneralButton>
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

export default SignupView;