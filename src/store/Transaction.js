import { decorate, observable, action } from 'mobx';
import { saveTransaction } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import Account from './Account';
import Budget from './Budget';
import BudgetCatetory from './BudgetCategory';

class Transaction {
    id = '';
    transactionDate = '';
    postDate = '';
    account = {};
    description = '';
    amount;
    isReimbursable = false;
    isReimbursement = false;
    isPayment = false;
    isSplit = false;
    comment ='';
    budget = {};
    category = {};
    parent;

    constructor(newTransaction = {}) {
        this.populate(newTransaction);
    }

    populate = transaction => {
        this.id = transaction.id;
        this.transactionDate = transaction.transactionDate || '';
        this.postDate = transaction.postDate || '';
        this.account = new Account(transaction.account || undefined);
        this.description = transaction.description || '';
        this.amount = transaction.description || '';
        this.isReimbursable = Boolean(transaction.reimbursable);
        this.isReimbursement = Boolean(transaction.reinbursement);
        this.isPayment = Boolean(transaction.payment);
        this.isSplit = Boolean(transaction.split);
        this.comment = transaction.comment || '';
        this.budget = new Budget(transaction.monthBudget || undefined);
        this.category = new BudgetCatetory(transaction.budgetCategory || undefined);
        this.parent = transaction.parent;
    }

    savableObject = root => {
        const result = {};

        if (root.id !== undefined) {
            result.id = root.id;
        }
        if (root.name !== undefined) {
            result.account = root.name;
        }
        if (root.type !== undefined) {
            result.accountType = root.type;
        }
        if (root.institution !== undefined) {
            result.institution = root.institution;
        }
        if (root.isActive !== undefined) {
            result.activeIndicator = root.isActive;
        }

        return result;
    };

    save = changes => {
        const accountToSave = { ...this.savableObject(this), ...this.savableObject(changes) };

        // rootStore.startLoading('account');
        // return saveAccount(accountToSave)
        //     .then(response => {
        //         this.populate(response.data);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     })
        //     .finally(() => {
        //         rootStore.stopLoading('account');
        //     });
    }
}

decorate(Transaction, {
    id: observable,
    transactionDate: observable,
    postDate: observable,
    account: observable,
    description: observable,
    amount: observable,
    isReimbursable: observable,
    isReimbursement: observable,
    isPayment: observable,
    isSplit: observable,
    comment: observable,
    budget: observable,
    category: observable,
    parent: observable,
    save: action
});

export default Transaction;