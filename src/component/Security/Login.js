import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export const GOOGLE_AUTH_URL = `${process.env.REACT_APP_WINDMILL_API_BASE_URL}/oauth2/authorize/google?redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth2/redirect`;

const Login = () => {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (location.state && location.state.error) {
            setTimeout(() => {
                // Alert.error(location.state.error, {
                //     timeout: 5000
                // });
                history.replace({
                    pathname: location.pathname,
                    state: {}
                });
            }, 100);
        }
    }, [location, history]);

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to Windmill</h1>
                <div className="social-login">
                    <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                        <img src="./google-logo.png" alt="Google" /> Log in with Google</a>
                </div>
            </div>
        </div>
    );
};

export default Login;