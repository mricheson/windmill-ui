import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getTransactions, getTransactionForBudget } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import Transaction from './Transaction';

class TransactionStore {
    transactions = [];

    load = (year, month) => {
        const loader = (year == null || month == null) ? getTransactions : getTransactionForBudget;

        rootStore.startLoading('transactions');
        return loader(year, month)
            .then(response => {
                this.transactions = response.data.map(transaction => new Transaction(transaction));
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('transactions');
            });
    }

    upload = (account, csv) => {
        rootStore.startLoading('transactionUpload');
        return Promise.all(
            csv.map(line => {
                const transactionDate = line['Transaction Date'] || line['Date'];
                const postDate = line['Post Date'];

                const transaction = new Transaction({
                    account: account,
                    transactionDate: new Date(transactionDate),
                    postDate: postDate && postDate !== '' ? new Date(postDate) : undefined,
                    description: line['Description'],
                    amount: line['Amount'],
                    payment: line['Type'] === 'Payment',
                });
                return transaction.save();
            }))
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('transactionUpload');
            });
    }
}

decorate(TransactionStore, {
    transactions: observable,
    load: action,
    upload: action
});

export const TransactionStoreContext = createContext(new TransactionStore());