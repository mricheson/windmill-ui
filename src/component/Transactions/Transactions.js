import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TransactionStoreContext } from '../../store/TransactionStore';
import { TableContainer, Table, makeStyles, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react-lite';
import TransactionIcon from './TransactionIcon';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: theme.breakpoints.values.lg,
        alignItems: 'center'
    }
}))

const getType = transaction => {
    if (transaction.payment) {
        return 'payment';
    }

    if (transaction.reimbursable) {
        return 'reimbursable';
    }

    if (transaction.reimbursement) {
        return 'reimbursement';
    }

    return '';
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const Transactions = observer(() => {
    const classes = useStyles();
    const { month, year } = useParams();
    const transactionStore = useContext(TransactionStoreContext);

    useEffect(() => {
        transactionStore.load(year, month);
    }, [transactionStore, month, year]);

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
                                <TableCell>{transaction.account.institution.name}<br />{transaction.account.account}</TableCell>
                                <TableCell>{moment(transaction.transactionDate).format('M/D/YY')}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell align="right">{formatter.format(transaction.amount)}</TableCell>
                                <TableCell>{transaction.budgetCategory ? (<>{transaction.budgetCategory.budgetGroup.name}<br />{transaction.budgetCategory.name}</>) : ''}</TableCell>
                                <TableCell>{transaction.comment}</TableCell>
                                <TableCell><TransactionIcon type={getType(transaction)} /></TableCell>
                                <TableCell><EditIcon color="disabled" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
});

export default Transactions;