import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getAccounts } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import Account from './Account';

class AccountStore {
    accounts = [];

    load = () => {
        rootStore.startLoading('accounts');
        return getAccounts()
            .then(response => {
                this.accounts = response.data.map(account => new Account(account));
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('accounts');
            });
    }
}

decorate(AccountStore, {
    accounts: observable,
    load: action
});

export const AccountStoreContext = createContext(new AccountStore());