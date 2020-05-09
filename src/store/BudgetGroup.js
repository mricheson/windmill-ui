import { decorate, observable, action } from 'mobx';
import { saveBudgetGroup } from '../common/WindmillApi';
import { rootStore } from './RootStore';

class BudgetGroup {
    name = '';
    id = '';
    isSavings = false;
    position = 0

    constructor(newBudgetGroup = {}) {
        this.populate(newBudgetGroup);
    }

    populate = budgetGroup => {
        this.id = budgetGroup.id;
        this.name = budgetGroup.name || '';
        this.position = budgetGroup.position || 0;
        this.isSavings = Boolean(budgetGroup.savingsIndicator);
    }

    savableObject = root => {
        const result = {};

        if (root.id !== undefined) {
            result.id = root.id;
        }
        if (root.name !== undefined) {
            result.name = root.name;
        }
        if (root.position !== undefined) {
            result.position = root.position;
        }
        if (root.isSavings !== undefined) {
            result.savingsIndicator = root.isSavings;
        }

        return result;
    };

    save = changes => {
        const budgetGroupToSave = { ...this.savableObject(this), ...this.savableObject(changes) };

        rootStore.startLoading('budgetGroup');
        return saveBudgetGroup(budgetGroupToSave)
            .then(response => {
                this.populate(response.data);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('budgetGroup');
            });
    }
}

decorate(BudgetGroup, {
    id: observable,
    name: observable,
    position: observable,
    isSavings: observable,
    save: action
});

export default BudgetGroup;