import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getAccountTypes } from '../common/WindmillApi';
import { rootStore } from './RootStore';

class AccountTypeStore {
    accountTypes = [];

    load = () => {
        rootStore.startLoading('accountTypes');
        return getAccountTypes()
            .then(response => {
                this.accountTypes = response.data;
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('accountTypes');
            });
    }
}

decorate(AccountTypeStore, {
    accountTypes: observable,
    load: action
});

export const AccountTypeStoreContext = createContext(new AccountTypeStore());