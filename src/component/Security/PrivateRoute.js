import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, authenticated, ...rest }) => {
    const location = useLocation();

    return (
        <Route {...rest} >
            {authenticated
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
}

export default PrivateRoute;