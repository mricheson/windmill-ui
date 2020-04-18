import React from 'react';
import GoogleLogin from 'react-google-login';

function GoogleSecurity({ children }) {
    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <>
            <GoogleLogin
                clientId="205167229766-11dqad8kik9e8sukuuicg1q9klmkg6hl.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            {children}
        </>
    );
}

export default GoogleSecurity;