import React, { useContext, useEffect, useState } from 'react';
import { TransactionStoreContext } from '../../store/TransactionStore';
import { TableContainer, Table, makeStyles, TableHead, TableRow, TableCell, TableBody, CircularProgress, IconButton, TextField, Fab, Checkbox, TablePagination, Typography } from '@material-ui/core';
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
import UploadModal from './UploadModal';

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
    const [uploadModal, setUploadModal] = useState(null);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = React.useState(0);

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

    const openUploadModal = transaction => setUploadModal(
        <UploadModal onClose={() => setUploadModal(null)} onSave={transactionStore.load} />
    );

    const handleSelection = transaction => event => {
        const index = selected.findIndex(_transaction => _transaction.id === transaction.id);
        const newSelected = [...selected];

        if (index === -1) {
            newSelected.push(transaction);
        } else {
            newSelected.splice(index, 1);
        }

        setSelected(newSelected);
    }

    const isSelected = transactionId => selected.findIndex(transaction => transaction.id === transactionId) !== -1;

    const handleSelectedAction = action => {
        selected.forEach(transaction => action(transaction));
        setSelected([]);
        transactionStore.load();
    }

    if (rootStore.loading.has('transactions')) {
        return <CircularProgress />;
    }

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                {`Transactions${selected.length > 0 ? ` (${selected.length} selected)` : ''}`}
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" />
                            <TableCell>Account</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell className={classes.budget}>
                                {selected.length > 0
                                    ? (
                                        <Autocomplete
                                            options={budgetStore.budgets}
                                            getOptionLabel={budget => budget.id != null && moment(budget.date).format('YYYY - MMMM') || ''}
                                            renderInput={(params) => <TextField {...params} />}
                                            onChange={(event, newValue) => handleSelectedAction(transaction => transaction.save({ budget: newValue }))}
                                        />
                                    )
                                    : 'Budget'
                                }
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionStore.transactions
                            .slice(page * 50, page * 50 + 50)
                            .map(transaction => (
                                <TableRow key={transaction.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected(transaction.id)}
                                            onChange={handleSelection(transaction)}
                                        />
                                    </TableCell>
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
                                                    renderInput={(params) => <TextField {...params} />}
                                                    value={transaction.budget}
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
            <TablePagination
                component="div"
                count={transactionStore.transactions.length}
                rowsPerPage={50}
                rowsPerPageOptions={[50]}
                page={page}
                onChangePage={(event, newPage) => setPage(newPage)}
            />
            <AddFooter
                onAdd={openAddModal}
                right={
                    <Fab color="default" onClick={openUploadModal}>
                        <BackupIcon />
                    </Fab>
                }
            />
            {addModal}
            {editModal}
            {uploadModal}
        </div >
    );
});

export default Transactions;