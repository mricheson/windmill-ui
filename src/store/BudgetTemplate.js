import { decorate, observable, action } from 'mobx';
import { saveBudgetTemplate } from '../common/WindmillApi';
import { rootStore } from './RootStore';

class BudgetTemplate {
    name = '';
    id = '';
    amount = 0.0;
    category = {};
    group = {};

    constructor(newBudgetTemplate = {}) {
        this.populate(newBudgetTemplate);
    }

    populate = budgetTemplate => {
        this.id = budgetTemplate.id;
        this.name = budgetTemplate.description || '';
        this.amount = budgetTemplate.amount || 0.0;
        this.category = budgetTemplate.budgetCategory || {};
        this.group = this.category.budgetGroup || budgetTemplate.group || {};
    }

    savableObject = root => {
        const result = {};

        if (root.id !== undefined) {
            result.id = root.id;
        }
        if (root.name !== undefined) {
            result.description = root.name;
        }
        if (root.amount !== undefined) {
            result.amount = root.amount;
        }
        if (root.category !== undefined) {
            result.budgetCategory = root.category;
        }

        return result;
    };

    save = changes => {
        const budgetTemplateToSave = { ...this.savableObject(this), ...this.savableObject(changes) };

        rootStore.startLoading('budgetTemplate');
        return saveBudgetTemplate(budgetTemplateToSave)
            .then(response => {
                this.populate(response.data);
                return this;
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('budgetTemplate');
            });
    }
}

decorate(BudgetTemplate, {
    id: observable,
    name: observable,
    position: observable,
    isSavings: observable,
    save: action
});

export default BudgetTemplate;