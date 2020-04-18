import { decorate, observable, action, computed } from 'mobx';
import { createContext } from 'react';

class AuthenticatonStore {
    profile = {};
    token = '';

    set = (profile = {}, token = '') => {
        this.profile = profile;
        this.token = token;
    }

    login = response => {
        if (response.profileObj.googleId === process.env.REACT_APP_GOOGLE_USER_ID) {
            this.set(response.profileObj, response.tokenId);
        } else {
            this.clear();
        }
    }

    clear = () => this.set();

    get isLoggedIn() {
        return Boolean(this.token && this.token.length > 0);
    }
}

decorate(AuthenticatonStore, {
    profile: observable,
    token: observable,
    login: action,
    clear: action,
    isLoggedIn: computed
});

export const AuthenticatonStoreContext = createContext(new AuthenticatonStore());