import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getBudgets, getBudget, createBudget } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import Budget from './Budget';

class BudgetStore {
    budgets = [];

    load = () => {
        rootStore.startLoading('budgets');
        return getBudgets()
            .then(response => {
                this.budgets = response.data.map(budget => new Budget(budget));
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

    get = (year, month) => {
        rootStore.startLoading('getBudget');
        return getBudget(year, month)
            .then(response => new Budget(response.data))
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('getBudget');
            });
    }
}

decorate(BudgetStore, {
    budgets: observable,
    load: action,
    create: action
});

export const BudgetStoreContext = createContext(new BudgetStore());