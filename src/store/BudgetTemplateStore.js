import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getBudgetTemplates } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import BudgetTemplate from './BudgetTemplate';

class BudgetTemplateStore {
    budgetTemplates = [];

    load = () => {
        rootStore.startLoading('budgetTemplates');
        return getBudgetTemplates()
            .then(response => {
                this.budgetTemplates = response.data.map(template => new BudgetTemplate(template));
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('budgetTemplates');
            });
    }
}

decorate(BudgetTemplateStore, {
    budgetTemplates: observable,
    load: action
});

export const BudgetTemplateStoreContext = createContext(new BudgetTemplateStore());