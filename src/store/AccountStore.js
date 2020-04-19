import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getAccounts } from '../common/WindmillApi';

class AccountStore {
    accounts = [];

    load = () => getAccounts()
        .then(response => {
            this.accounts = response.data;
        });
}

decorate(AccountStore, {
    accounts: observable,
    load: action
});

export const AccountStoreContext = createContext(new AccountStore());