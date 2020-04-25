import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getTransactions, getTransactionForBudget } from '../common/WindmillApi';
import { rootStore } from './RootStore';

class TransactionStore {
    transactions = [];

    load = (year, month) => {
        const loader = (year == null || month == null) ? getTransactions : getTransactionForBudget;

        rootStore.startLoading('transactions');
        return loader(year, month)
            .then(response => {
                this.transactions = response.data;
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('transactions');
            });
    }
}

decorate(TransactionStore, {
    transactions: observable,
    load: action
});

export const TransactionStoreContext = createContext(new TransactionStore());