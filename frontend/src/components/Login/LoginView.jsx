import React from 'react';

const LoginView = props => {
    const { onChange, onSubmit } = props;
    return (
        <div className="loginView">
            <h3 className="loginTitle">Please login or sign up to continue.</h3>
            <div className="loginInputContainer">
                <div className="emailInputContainer">
                    <input
                        onChange={onChange}
                        name="email"
                        type="email"
                        className="email"
                        placeholder="Email"
                    />
                </div>
                <div className="passwordInputContainer">
                    <input
                        onChange={onChange}
                        name="password"
                        type="password"
                        className="password"
                        placeholder="Password"
                    />
                </div>
            </div>
            <button onClick={e => onSubmit(e)} type="submit">Log in</button>
        </div>
    );
};

export default LoginView;