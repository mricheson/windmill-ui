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
    isPending = false;
    comment = '';
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
        this.amount = transaction.amount || '';
        this.isReimbursable = Boolean(transaction.reimbursable);
        this.isReimbursement = Boolean(transaction.reimbursement);
        this.isPayment = Boolean(transaction.payment);
        this.isPending = Boolean(transaction.pending);
        this.isSplit = Boolean(transaction.split);
        this.comment = transaction.comment || '';
        this.budget = new Budget(transaction.budget || transaction.monthBudget || undefined);
        this.category = new BudgetCatetory(transaction.budgetCategory || undefined);
        this.parent = transaction.parent;
    }

    savableObject = root => {
        const result = {};

        if (root.id !== undefined) {
            result.id = root.id;
        }
        if (root.transactionDate !== undefined) {
            result.transactionDate = root.transactionDate;
        }
        if (root.postDate !== undefined) {
            result.postDate = root.postDate;
        }
        if (root.account !== undefined) {
            result.account = root.account;
        }
        if (root.description !== undefined) {
            result.description = root.description;
        }
        if (root.amount !== undefined) {
            result.amount = root.amount;
        }
        if (root.isReimbursable !== undefined) {
            result.reimbursable = root.isReimbursable;
        }
        if (root.isReimbursement !== undefined) {
            result.reimbursement = root.isReimbursement;
        }
        if (root.isPayment !== undefined) {
            result.payment = root.isPayment;
        }
        if (root.isPending !== undefined) {
            result.pending = root.isPending;
        }
        if (root.isSplit !== undefined) {
            result.split = root.isSplit;
        }
        if (root.comment !== undefined) {
            result.comment = root.comment;
        }
        if (root.budget !== undefined) {
            result.monthBudget = root.budget;
        }
        if (root.category !== undefined) {
            result.budgetCategory = root.category;
        }
        if (root.parent !== undefined) {
            result.parent = root.parent;
        }

        return result;
    };

    save = (changes = {}) => {
        const transactionToSave = { ...this.savableObject(this), ...this.savableObject(changes) };

        if(transactionToSave.monthBudget.id === ''){
            transactionToSave.monthBudget = undefined;
        }

        if(transactionToSave.budgetCategory.id === ''){
            transactionToSave.budgetCategory = undefined;
        }

        const id = this.id;
        rootStore.startLoading(`transaction[${id}]`);
        return saveTransaction(transactionToSave)
            .then(response => {
                this.populate(response.data);
                return this;
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading(`transaction[${id}]`);
            });
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
    isPendingt: observable,
    isSplit: observable,
    comment: observable,
    budget: observable,
    category: observable,
    parent: observable,
    save: action
});

export default Transaction;