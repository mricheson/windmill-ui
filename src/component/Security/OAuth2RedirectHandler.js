import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { setToken } from '../../store/Token';


const OAuth2RedirectHandler = () => {
    const history = useHistory();
    const location = useLocation();

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
};

export default OAuth2RedirectHandler;