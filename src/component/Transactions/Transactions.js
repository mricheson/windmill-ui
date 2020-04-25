import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TransactionStoreContext } from '../../store/TransactionStore';
import { TableContainer, Table, makeStyles, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: theme.breakpoints.values.lg,
        alignItems: 'center'
    }
}))

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
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Account</TableCell>
                            <TableCell>Trans Date</TableCell>
                            <TableCell>Post Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Reimb Exp</TableCell>
                            <TableCell>Reimb</TableCell>
                            <TableCell>Payment</TableCell>
                            <TableCell>Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionStore.transactions.map(transaction => (
                            <TableRow key={transaction.id}>
                                <TableCell>{`${transaction.account.institution.name}::${transaction.account.account}`}</TableCell>
                                <TableCell>{transaction.transactionDate}</TableCell>
                                <TableCell>{transaction.postDate}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.budgetCategory ? `${transaction.budgetCategory.budgetGroup.name}::${transaction.budgetCategory.name}`: ''}</TableCell>
                                <TableCell>{`${transaction.reimbursable}`}</TableCell>
                                <TableCell>{`${transaction.reimbursement}`}</TableCell>
                                <TableCell>{`${transaction.payment}`}</TableCell>
                                <TableCell>{transaction.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
});

export default Transactions;