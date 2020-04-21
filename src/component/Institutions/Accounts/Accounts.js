import React, { useContext } from 'react';
import { List, CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import { AccountStoreContext } from '../../../store/AccountStore';
import { RootStoreContext } from '../../../store/RootStore';
import Account from './Account';

const useStyles = makeStyles({
    accountSpinner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
});

const InstitutionCard = observer(({ institutionId }) => {
    const accountStore = useContext(AccountStoreContext);
    const rootStore = useContext(RootStoreContext);
    const classes = useStyles();

    const getAccounts = () => accountStore.accounts.slice()
        .filter(account => account.institution.id === institutionId)
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    if (rootStore.loading.has('accounts')) {
        return (
            <div className={classes.accountSpinner}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <List>
            {getAccounts().map(account => <Account key={account.id} account={account} />)}
        </List>
    );
});

export default InstitutionCard;