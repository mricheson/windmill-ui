import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TransactionStoreContext } from '../../store/TransactionStore';
import { TableContainer, Table, makeStyles, TableHead, TableRow, TableCell, TableBody, CircularProgress, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react-lite';
import TransactionIcon from './TransactionIcon';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { RootStoreContext } from '../../store/RootStore';
import AddFooter from '../../common/component/AddFooter';
import TransactionModal from './TransactionModal';
import Transaction from '../../store/Transaction';
import { BudgetStoreContext } from '../../store/BudgetStore';
import { AccountStoreContext } from '../../store/AccountStore';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: theme.breakpoints.values.lg,
        alignItems: 'center'
    }
}))

const getType = transaction => {
    if (transaction.isPayment) {
        return 'payment';
    }

    if (transaction.isReimbursable) {
        return 'reimbursable';
    }

    if (transaction.isReimbursement) {
        return 'reimbursement';
    }

    return '';
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const TransactionsForBudget = observer(() => {
    const classes = useStyles();
    const { month, year } = useParams();
    const transactionStore = useContext(TransactionStoreContext);
    const budgetStore = useContext(BudgetStoreContext);
    const accountStore = useContext(AccountStoreContext);
    const rootStore = useContext(RootStoreContext);
    const [addModal, setAddModal] = useState(null);
    const [editModal, setEditModal] = useState(null);
    const [budget, setBudget] = useState(null);

    useEffect(() => {
        transactionStore.load(year, month);
    }, [transactionStore, month, year]);

    useEffect(() => {
        Promise.all([
            budgetStore.load(),
            accountStore.load()
        ]);
    }, [budgetStore, accountStore])

    useEffect(() => {
        budgetStore.get(year, month)
            .then(setBudget);
    }, [year, month]);

    const openAddModal = () => setAddModal(
        <TransactionModal transaction={new Transaction({ budget })} onClose={() => setAddModal(null)} onSave={transaction => transactionStore.transactions.push(transaction)} mode="add" />
    );

    const openEditModal = transaction => setEditModal(
        <TransactionModal transaction={transaction} onClose={() => setEditModal(null)} />
    );

    if (rootStore.loading.has('transactions')) {
        return <CircularProgress />;
    }

    return (
        <div className={classes.root}>
            <div>{`Transactions ${year}-${month}`}</div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Account</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Comment</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionStore.transactions.slice().sort((a, b) => new Date(a.transactionDate) - new Date(b.transactionDate)).map(transaction => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.account.institution.name}<br />{transaction.account.name}</TableCell>
                                <TableCell>{moment(transaction.transactionDate).format('M/D/YY')}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell align="right">{formatter.format(transaction.amount)}</TableCell>
                                <TableCell>{transaction.category ? (<>{transaction.category.group.name}<br />{transaction.category.name}</>) : ''}</TableCell>
                                <TableCell>{transaction.comment}</TableCell>
                                <TableCell><TransactionIcon type={getType(transaction)} /></TableCell>
                                <TableCell><IconButton onClick={() => openEditModal(transaction)}><EditIcon color="disabled" /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddFooter onAdd={openAddModal} />
            {addModal}
            {editModal}
        </div >
    );
});

export default TransactionsForBudget;