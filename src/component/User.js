import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthenticatonStoreContext } from '../store/AuthenticationStore';
import GoogleLogin from 'react-google-login';
import UserMenu from './UserMenu';

const User = observer(() => {
    const { isLoggedIn, login, clear } = useContext(AuthenticatonStoreContext);

    return isLoggedIn
        ? <UserMenu />
        : <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={login}
            onFailure={clear}
            cookiePolicy={'single_host_origin'}
        />;
});

export default User;