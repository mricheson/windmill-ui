import { decorate, observable, action, computed } from 'mobx';
import { createContext } from 'react';

const ACCESS_TOKEN = 'accessToken';

class RootStore {
    token = '';
    loading = new Set();

    RootStore() {
        this.token = localStorage.getItem(ACCESS_TOKEN) || '';
        this.loading = new Set();
    }

    get isLoggedIn() {
        return Boolean(this.token && this.token.length > 0);
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
    setToken: action,
    startLoading: action,
    stopLoading: action,
    isLoggedIn: computed
});

export const rootStore = new RootStore();

export const RootStoreContext = createContext(rootStore);