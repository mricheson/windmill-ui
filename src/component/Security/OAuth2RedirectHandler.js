import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { RootStoreContext } from '../../store/RootStore';
import { observer } from 'mobx-react-lite';


const OAuth2RedirectHandler = observer(() => {
    const history = useHistory();
    const location = useLocation();
    const { setToken } = useContext(RootStoreContext);

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
        setToken(token);
    } else {
        setToken('');
    }

    history.push('/');

    return <></>;
});

export default OAuth2RedirectHandler;