import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getBudgets } from '../common/WindmillApi';
import { rootStore } from './RootStore';

class BudgetStore {
    budgets = [];

    load = () => {
        rootStore.startLoading('budgets');
        return getBudgets()
            .then(response => {
                this.budgets = response.data;
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('budgets');
            });
    }
}

decorate(BudgetStore, {
    budgets: observable,
    load: action
});

export const BudgetStoreContext = createContext(new BudgetStore());