import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthenticatonStoreContext } from '../store/AuthenticationStore';
import GoogleLogin from 'react-google-login';
import UserMenu from './UserMenu';

const User = observer(() => {
    const authStore = useContext(AuthenticatonStoreContext);

    return authStore.token.length > 0
        ? <UserMenu />
        : <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={authStore.login}
            onFailure={authStore.clear}
            cookiePolicy={'single_host_origin'}
        />;
});

export default User;