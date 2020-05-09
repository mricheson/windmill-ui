import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { RootStoreContext } from '../../store/RootStore';
import { observer } from 'mobx-react-lite';

const PrivateRoute = observer(({ children, ...rest }) => {
    const location = useLocation();
    const rootStore = useContext(RootStoreContext);

    return (
        <Route {...rest} >
            {rootStore.isLoggedIn
                ? children
                : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location }
                        }}
                    />
                )
            }
        </Route>
    );
});

export default PrivateRoute;