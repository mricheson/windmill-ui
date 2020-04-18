import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthenticatonStoreContext } from '../store/AuthenticationStore';

const Layout = observer(() => {
    const authStore = useContext(AuthenticatonStoreContext);
    return (
        <>
           <img src={authStore.profile.imageUrl} />
        </>
    );
});

export default Layout;