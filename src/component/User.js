import React from 'react';
import { setToken } from '../store/Token';

const User = ({authenticated}) =>  authenticated
    ? <div onClick={() =>setToken('')}>Sign Out</div>
    : 'Sign In';

export default User;