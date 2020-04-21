import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getBudgetGroups } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import BudgetGroup from './BudgetGroup';

class BudgetGroupStore {
    budgetGroups = [];

    load = () => {
        rootStore.startLoading('budgetGroup');
        return getBudgetGroups()
            .then(response => {
                this.budgetGroups = response.data.map(group => new BudgetGroup(group));
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('budgetGroup');
            });
    }
}

decorate(BudgetGroupStore, {
    budgetGroups: observable,
    load: action
});

export const BudgetGroupStoreContext = createContext(new BudgetGroupStore());