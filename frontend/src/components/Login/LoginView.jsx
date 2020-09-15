import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GeneralButton } from '../../utils/styles/generalStyles';
import { green, medGrey, white } from '../../utils/colors/main';

const LoginContainer = styled.div`
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
            <h3 className="loginTitle">Please login or sign up to continue.</h3>
            <NewUser className="newUserSignupLink">
                New User? {" "}
                <Link to="/signup">
                    Sign up.
                </Link>
            </NewUser>
            <div className="loginInputContainer">
                <InputContainer className="emailInputContainer">
                    <Input
                        marginBottom="20px"
                        onChange={onChange}
                        name="email"
                        type="email"
                        className="email"
                        placeholder="Email"
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
                    />
                </InputContainer>
            </div>
            <GeneralButton
                background={email && password ? green : medGrey}
                color={white}
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
        </LoginContainer>
    );
};

export default LoginView;