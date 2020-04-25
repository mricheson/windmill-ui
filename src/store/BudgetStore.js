import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getBudgets, createBudget } from '../common/WindmillApi';
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
    };

    create = (year, month) => {
        rootStore.startLoading('createBudget');
        return createBudget(year, month)
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('createBudget');
            });
    }
}

decorate(BudgetStore, {
    budgets: observable,
    load: action,
    create: action
});

export const BudgetStoreContext = createContext(new BudgetStore());