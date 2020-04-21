import { decorate, observable, action, computed } from 'mobx';
import { createContext } from 'react';
import jwtDecode from 'jwt-decode';

const ACCESS_TOKEN = 'accessToken';
export const DRAWER_WIDTH = 240;

class RootStore {
    token = '';
    loading = new Set();
    drawerOpen = true;

    constructor() {
        this.token = localStorage.getItem(ACCESS_TOKEN) || '';
        this.loading = new Set();
    }

    get isLoggedIn() {
        return Boolean(this.token && this.token.length > 0);
    }

    get decodedToken() {
        const jwt = jwtDecode(this.token);
        console.log(jwt);
        return jwt;
    }

    startLoading = element => this.loading.add(element);

    stopLoading = element => this.loading.delete(element);

    setToken = token => {
        token = token || '';
        localStorage.setItem(ACCESS_TOKEN, token);
        this.token = token;
    }
}

decorate(RootStore, {
    token: observable,
    loading: observable,
    drawerOpen: observable,
    setToken: action,
    startLoading: action,
    stopLoading: action,
    isLoggedIn: computed,
    decodedToken: computed
});

export const rootStore = new RootStore();

export const RootStoreContext = createContext(rootStore);