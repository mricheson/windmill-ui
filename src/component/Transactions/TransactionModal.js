import React, { useContext, useState } from 'react';
import { TextField, makeStyles, FormControlLabel, Checkbox } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import EditModal from '../../common/component/EditModal';
import { BudgetStoreContext } from '../../store/BudgetStore';
import { AccountStoreContext } from '../../store/AccountStore';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { CurrencyFormat } from '../../common/component/Currency';
import { BudgetCategoryStoreContext } from '../../store/BudgetCategoryStore';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
    amount: {
        '& input': {
            textAlign: 'right'
        }
    },
    split:
    {
        display: 'flex',
        '& > *': {
            width: '50%'
        },
        '& > :not(:last-child)': {
            marginRight: theme.spacing(1)
        },
        '& > :not(:first-child)': {
            marginLeft: theme.spacing(1)
        }
    }
}));

const TransactionModal = observer(({ transaction, onClose, onSave = () => { }, mode }) => {
    const classes = useStyles();

    const rootStore = useContext(RootStoreContext);
    const budgetStore = useContext(BudgetStoreContext);
    const accountStore = useContext(AccountStoreContext);
    const categoryStore = useContext(BudgetCategoryStoreContext);

    const [editedBudget, setEditedBudget] = useState(transaction.budget);
    const [editedAccount, setEditedAccount] = useState(transaction.account);
    const [editedTransactionDate, setEditedTransactionDate] = useState(transaction.transactionDate);
    const [editedPostDate, setEditedPostDate] = useState(transaction.postDate);
    const [editedDescription, setEditedDescription] = useState(transaction.description);
    const [editedAmount, setEditedAmount] = useState(transaction.amount);
    const [editedCategory, setEditedCategory] = useState(transaction.category);
    const [editedComment, setEditedComment] = useState(transaction.comment);
    const [editedIsReimbursable, setEditedIsReimbursable] = useState(transaction.isReimbursable);
    const [editedIsReimbursement, setEditedIsReimbursement] = useState(transaction.isReimbursement);
    const [editedIsPending, setEditedIsPending] = useState(transaction.isPending);
    const [editedIsPayment, setEditedIsPayment] = useState(transaction.isPayment);

    const onBudgetChange = (event, newValue) => setEditedBudget(newValue);
    const onAccountChange = (event, newValue) => setEditedAccount(newValue);
    const onTranactionDateChange = (date, value) => setEditedTransactionDate(value);
    const onPostDateChange = (date, value) => setEditedPostDate(value);
    const onDescriptionChange = event => setEditedDescription(event.target.value);
    const onAmountChange = event => setEditedAmount(event.target.value);
    const onCategoryChange = (event, newValue) => setEditedCategory(newValue);
    const onCommentChange = event => setEditedComment(event.target.value);
    const onIsReimbursableChange = event => {
        setEditedIsReimbursable(event.target.checked);
        if (editedIsReimbursement && event.target.checked) {
            setEditedIsReimbursement(!editedIsReimbursement)
        }
    };
    const onIsReimbursementChange = event => {
        setEditedIsReimbursement(event.target.checked);
        if (editedIsReimbursable && event.target.checked) {
            setEditedIsReimbursable(!editedIsReimbursable)
        }
    };
    const onIsPaymentChange = event => setEditedIsPayment(event.target.checked);
    const onIsPendingChange = event => setEditedIsPending(event.target.checked);

    const save = () => {
        // transaction.save({ name: editedName })
        //     .then(() => onSave(transaction))
        //     .then(onClose);
    }

    const isSaving = rootStore.loading.has('transaction');

    return (
        <EditModal
            onSave={save}
            onClose={onClose}
            isSaving={isSaving}
            title="Transaction"
            mode={mode}
        >
            <div className={classes.split}>
                <Autocomplete
                    options={budgetStore.budgets}
                    getOptionLabel={budget => budget.id != null && moment(budget.date).format('YYYY - MMMM') || ''}
                    renderInput={(params) => <TextField {...params} label="Budget" />}
                    value={editedBudget}
                    onChange={onBudgetChange}
                />
                <Autocomplete
                    options={accountStore.accounts}
                    getOptionLabel={account => account.id != null && `${account.name} (${account.institution.name})` || ''}
                    renderInput={(params) => <TextField {...params} label="Account" />}
                    value={editedAccount}
                    onChange={onAccountChange}
                />
            </div>
            <div className={classes.split}>
                <KeyboardDatePicker
                    clearable
                    label="Transaction Date"
                    value={null}
                    inputValue={editedTransactionDate}
                    onChange={onTranactionDateChange}
                    format="YYYY-MM-DD"
                />
                <KeyboardDatePicker
                    clearable
                    label="Post Date"
                    value={null}
                    inputValue={editedPostDate}
                    onChange={onPostDateChange}
                    format="YYYY-MM-DD"
                />
            </div>
            <TextField
                label="Description"
                fullWidth
                onChange={onDescriptionChange}
                value={editedDescription}
                disabled={isSaving}
            />

            <div className={classes.split}>
                <TextField
                    value={editedAmount}
                    label="Amount"
                    onChange={onAmountChange}
                    InputProps={{
                        inputComponent: CurrencyFormat,
                        className: classes.amount
                    }}
                />
                <Autocomplete
                    options={categoryStore.budgetCategories}
                    getOptionLabel={category => category.id != null && `${category.name} (${category.group.name})` || ''}
                    renderInput={(params) => <TextField {...params} label="Category" />}
                    value={editedCategory}
                    onChange={onCategoryChange}
                />
            </div>
            <TextField
                label="Comment"
                fullWidth
                onChange={onCommentChange}
                value={editedComment}
                disabled={isSaving}
            />

            <div className={classes.split}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            disabled={isSaving}
                            value={editedIsReimbursable}
                            checked={editedIsReimbursable}
                            onChange={onIsReimbursableChange}
                        />
                    }
                    label="Reimbursable"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            disabled={isSaving}
                            value={editedIsReimbursement}
                            checked={editedIsReimbursement}
                            onChange={onIsReimbursementChange}
                        />
                    }
                    label="Reimbursement"
                />
            </div>
            <div className={classes.split}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            disabled={isSaving}
                            value={editedIsPayment}
                            checked={editedIsPayment}
                            onChange={onIsPaymentChange}
                        />
                    }
                    label="Payment"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            disabled={isSaving}
                            value={editedIsPending}
                            checked={editedIsPending}
                            onChange={onIsPendingChange}
                        />
                    }
                    label="Pending"
                />
            </div>
        </EditModal>
    );
});

export default TransactionModal;