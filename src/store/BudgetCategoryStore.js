import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getBudgetCategories } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import BudgetCategory from './BudgetCategory';

class BudgetCategoryStore {
    budgetCategories = [];

    load = () => {
        rootStore.startLoading('budgetCategories');
        return getBudgetCategories()
            .then(response => {
                this.budgetCategories = response.data.map(category => new BudgetCategory(category));
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