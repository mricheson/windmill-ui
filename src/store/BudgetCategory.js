import { decorate, observable } from 'mobx';
import BudgetGroup from './BudgetGroup';
import Account from './Account';

class BudgetCategory {
    id = '';
    name = '';
    position = 0;
    isUtility = false;
    group = {};
    savingsAccount = {};

    constructor(category = {}) {
        this.populate(category);
    }

    populate = category => {
        this.id = category.id || '';
        this.name = category.name || '';
        this.position = category.position;
        this.isUtility = Boolean(category.utilityIndicator);
        this.group = new BudgetGroup(category.budgetGroup || undefined);
        this.savingsAccount = new Account(category.savingsAccount || undefined);
    }
}

decorate(BudgetCategory, {
    id: observable,
    name: observable,
    position: observable,
    isUtility: observable,
    group: observable,
    savingsAccount: observable,
    isActive: observable,
    institution: observable
});

export default BudgetCategory;