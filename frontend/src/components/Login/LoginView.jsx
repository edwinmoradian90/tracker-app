import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GeneralButton, fadein } from '../../utils/styles/generalStyles';
import { green, medGrey, white } from '../../utils/colors/main';

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
`;

const Input = styled.input`
    margin-bottom: ${props => props.marginBottom};
    width: 94%;
`;

const LoginView = props => {
    const { onChange, onSubmit, state } = props;
    const { email, password } = state;
    return (
        <LoginContainer className="loginView">
            <LoginTitle className="loginTitle">Please login or sign up to continue.</LoginTitle>
            <div className="loginInputContainer">
                <InputContainer className="emailInputContainer">
                    <Input
                        marginBottom="20px"
                        onChange={onChange}
                        name="email"
                        type="email"
                        className="email"
                        placeholder="Email"
                        value={email}
                    />
                </InputContainer>
                <InputContainer className="passwordInputContainer">
                    <Input
                        onChange={onChange}
                        name="password"
                        type="password"
                        className="password"
                        placeholder="Password"
                        marginBottom="20px"
                        value={password}
                    />
                </InputContainer>
            </div>
            <GeneralButton
                animation={true}
                background={email && password ? green : medGrey}
                color={white}
                className="submitLoginForm"
                onClick={
                    email && password
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

const { func, object } = PropTypes;
LoginView.propTypes = {
    onChange: func.isRequired,
    onSubmit: func.isRequired,
    state: object.isRequired,
};

export default LoginView;