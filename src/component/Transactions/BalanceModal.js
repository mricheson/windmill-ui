import React, { useContext } from 'react';
import { Slide, Dialog, DialogTitle, DialogContent, useTheme, makeStyles, List, ListItem, ListItemText } from '@material-ui/core';
import { TransactionStoreContext } from '../../store/TransactionStore';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import clsx from 'clsx';

const useStyle = makeStyles(theme => ({
    root: {
        width: theme.breakpoints.values.sm
    },
    formControl: {
        margin: [[theme.spacing(1), 0, theme.spacing(1), 0]],
    },
    income: {
        color: green[900]
    },
    expense: {
        color: red[900]
    },
    balance: {
        '& span': {
            textAlign: 'right'
        }
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const BalanceModal = ({ onSave, canSave = true, onClose, isSaving, title, mode = "edit", children }) => {
    const theme = useTheme();
    const classes = useStyle();

    const transactionStore = useContext(TransactionStoreContext);

    const balances = transactionStore.transactions.reduce((balances, transaction) => {
        const account = balances[transaction.account.id] || { account: transaction.account, balance: 0 };
        account.balance += transaction.amount;
        balances[transaction.account.id] = account;
        return balances;
    }, {});



    return (
        <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            PaperProps={{
                className: classes.root
            }}
        >
            <DialogTitle>Month's Balances</DialogTitle>
            <DialogContent>
                <List>
                    {
                        Object.values(balances).map(accountBalance => (
                            <ListItem>
                                <ListItemText primary={accountBalance.account.name} secondary={accountBalance.account.institution.name} />
                                <ListItemText primary={formatter.format(Math.abs(accountBalance.balance))} className={clsx(classes.balance, accountBalance.balance.toFixed(2) > 0 ? classes.income : null, accountBalance.balance.toFixed(2) < 0 ? classes.expense : null)} />
                            </ListItem>
                        ))
                    }
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default BalanceModal;