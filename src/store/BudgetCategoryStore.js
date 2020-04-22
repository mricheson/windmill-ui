import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getBudgetCategories } from '../common/WindmillApi';
import { rootStore } from './RootStore';

class BudgetCategoryStore {
    budgetCategories = [];

    load = () => {
        rootStore.startLoading('budgetCategories');
        return getBudgetCategories()
            .then(response => {
                this.budgetCategories = response.data;
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('budgetCategories');
            });
    }
}

decorate(BudgetCategoryStore, {
    budgetCategories: observable,
    load: action
});

export const BudgetCategoryStoreContext = createContext(new BudgetCategoryStore());