import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { observer } from 'mobx-react-lite';
import { AuthenticatonStoreContext } from '../store/AuthenticationStore';

const GoogleSecurity = observer(({ children }) => {
    const authStore = useContext(AuthenticatonStoreContext);

    const responseGoogle = (response = {}) => {
        authStore.profile = response.profileObj;
        authStore.token = response.tokenId;
    }

    return (
        <>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            {children}
        </>
    );
});

export default GoogleSecurity;