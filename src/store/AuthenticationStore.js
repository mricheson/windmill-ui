import { decorate, observable } from 'mobx';
import {createContext} from 'react';

class AuthenticatonStore {
    profile = {};
    token = '';
}

decorate(AuthenticatonStore, {
    profile: observable,
    token: observable
});

export const AuthenticatonStoreContext = createContext(new AuthenticatonStore());