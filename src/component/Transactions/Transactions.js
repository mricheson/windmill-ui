import React, { useContext, useEffect, useState } from 'react';
import { TransactionStoreContext } from '../../store/TransactionStore';
import { TableContainer, Table, makeStyles, TableHead, TableRow, TableCell, TableBody, CircularProgress, IconButton, TextField, Fab } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react-lite';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { RootStoreContext } from '../../store/RootStore';
import AddFooter from '../../common/component/AddFooter';
import TransactionModal from './TransactionModal';
import Transaction from '../../store/Transaction';
import { BudgetStoreContext } from '../../store/BudgetStore';
import { AccountStoreContext } from '../../store/AccountStore';
import { BudgetCategoryStoreContext } from '../../store/BudgetCategoryStore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BackupIcon from '@material-ui/icons/Backup';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: theme.breakpoints.values.lg,
        alignItems: 'center',
    },
    budget: {
        width: 250
    },
    budgetSaving: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const Transactions = observer(() => {
    const classes = useStyles();
    const transactionStore = useContext(TransactionStoreContext);
    const budgetStore = useContext(BudgetStoreContext);
    const accountStore = useContext(AccountStoreContext);
    const rootStore = useContext(RootStoreContext);
    const [addModal, setAddModal] = useState(null);
    const [editModal, setEditModal] = useState(null);

    useEffect(() => {
        transactionStore.load();
    }, [transactionStore]);

    useEffect(() => {
        Promise.all([
            budgetStore.load(),
            accountStore.load()
        ]);
    }, [budgetStore, accountStore])


    const openAddModal = () => setAddModal(
        <TransactionModal transaction={new Transaction()} onClose={() => setAddModal(null)} onSave={transaction => transactionStore.transactions.push(transaction)} mode="add" />
    );

    const openEditModal = transaction => setEditModal(
        <TransactionModal transaction={transaction} onClose={() => setEditModal(null)} />
    );

    if (rootStore.loading.has('transactions')) {
        return <CircularProgress />;
    }

    return (
        <div className={classes.root}>
            <div>{`Transactions`}</div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Account</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Budget</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionStore.transactions.slice().sort((a, b) => (moment(a.transactionDate).isValid() && moment(b.transactionDate).isValid()) ? moment(b.transactionDate) - moment(a.transactionDate) : -1).map(transaction => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.account.institution.name}<br />{transaction.account.name}</TableCell>
                                <TableCell>{moment(transaction.transactionDate).isValid() ? moment(transaction.transactionDate).format('M/D/YY') : ''}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell align="right">{formatter.format(transaction.amount)}</TableCell>
                                <TableCell className={classes.budget}>
                                    {
                                        rootStore.loading.has(`transaction[${transaction.id}]`)
                                            ? <div className={classes.budgetSaving}><CircularProgress size={32} /></div>
                                            :
                                            <Autocomplete
                                                options={budgetStore.budgets}
                                                getOptionLabel={budget => budget.id != null && moment(budget.date).format('YYYY - MMMM') || ''}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                renderInput={(params) => <TextField {...params} />}
                                                value={transaction.budget.id != null ? transaction.budget : undefined}
                                                onChange={(event, newValue) => transaction.save({ budget: newValue })}
                                            />
                                    }
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => openEditModal(transaction)}>
                                        <EditIcon color="disabled" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddFooter
                onAdd={openAddModal}
                right={
                    <Fab color="default" aria-label="add" onClick={()=>{console.log('upload')}}>
                        <BackupIcon />
                    </Fab>
                }
            />
            {addModal}
            {editModal}
        </div >
    );
});

export default Transactions;