import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GeneralButton, Input, Error, fadein } from '../../utils/styles/generalStyles';
import { green, medGrey, white, warningRed, line } from '../../utils/colors/main';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const LoginTitle = styled.div`
    margin: 20px 0;
`;

const NewUser = styled.p`
    animation: ${fadein} 1.5s 1;
    color: ${medGrey};
    opacity: .7;
    margin: 10px auto;
`;

const InputContainer = styled.div`
    margin-bottom: 0;
    width: 100%;
`;

const LoginView = props => {
    const { onChange, onSubmit, state, incorrectData } = props;
    const { email, password } = state;
    const validations = email && password && password.length >= 6;
    return (
        <LoginContainer className="loginView">
            <LoginTitle className="loginTitle">Please login or sign up to continue.</LoginTitle>
            <InputContainer className="loginInputContainer">
                <Input
                    marginBottom="20px"
                    onChange={onChange}
                    name="email"
                    type="email"
                    className="email"
                    placeholder="Email"
                    value={email}
                    width="100%"
                />
                <Input
                    onChange={onChange}
                    name="password"
                    type="password"
                    className="password"
                    placeholder="Password"
                    value={password}
                    width="100%"
                />
            </InputContainer>
            <Error
                margin="20px 20px 20px 0px"
                incorrectData={incorrectData}
            >
                Please check your email or password.
            </Error>
            <GeneralButton
                animation={true}
                background={validations ? green : medGrey}
                color={white}
                className="submitLoginForm"
                onClick={
                    validations
                        ?
                        e => onSubmit(e)
                        :
                        null
                }
                type="submit"
            >
                Log in
            </GeneralButton>
            <NewUser className="newUserSignupLink">
                New user? {" "}
                <Link to="/signup">
                    Sign up.
                </Link>
            </NewUser>
        </LoginContainer>
    );
};

const { func, object, bool } = PropTypes;
LoginView.propTypes = {
    onChange: func.isRequired,
    onSubmit: func.isRequired,
    state: object.isRequired,
    incorrectData: bool.isRequired,
};

export default LoginView;