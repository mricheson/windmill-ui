import { decorate, observable, action } from 'mobx';
import { saveAccount, getMonthBudgetCategories } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import Institution from './Institution';
import moment from 'moment';

class Budget {
    date = '';
    id = '';
    isReconciled = false;
    categories = [];

    constructor(newBudget = {}) {
        this.populate(newBudget);
    }

    populate = budget => {
        this.id = budget.id;
        this.date = budget.date || '';
        this.isReconciled = Boolean(budget.reconciledIndicator);
    }

    loadCategories = () => {
        const date = moment(this.date);
        rootStore.startLoading('monthBudgetCategories');

        return getMonthBudgetCategories(date.year(), date.month() + 1)
            .then(response => {
                this.categories = response.data;
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('monthBudgetCategories');
            });
    }
}

decorate(Budget, {
    id: observable,
    date: observable,
    isReconciled: observable,
    loadCategories: action
});

export default Budget;