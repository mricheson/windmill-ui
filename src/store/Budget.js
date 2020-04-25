import { decorate, observable, action } from 'mobx';
import { saveAccount } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import Institution from './Institution';

class Budget {
    date = '';
    id = '';
    isReconciled = false;

    constructor(newBudget = {}) {
        this.populate(newBudget);
    }

    populate = budget => {
        this.id = budget.id;
        this.date = budget.date || '';
        this.isReconciled = Boolean(budget.reconciledIndicator);
    }
}

decorate(Budget, {
    id: observable,
    date: observable,
    isReconciled: observable,
    loadCategories: action
});

export default Budget;