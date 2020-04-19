import React, { useEffect, useContext } from 'react';
import { InstitutionStoreContext } from '../../store/InstitutitionStore';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemIcon, Icon, CardActions, IconButton } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import { AccountStoreContext } from '../../store/AccountStore';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: 400,
        width: 300,
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    icon: {
        height: '100%'
    },
    iconImage: {
        textAlign: 'center'
    },
    cardAction: {
        justifyContent: 'center'
    },
    content: {
        height: 272,
        overflowY: 'auto'
    }
}))

const Institutions = observer(() => {
    const institutionStore = useContext(InstitutionStoreContext);
    const accountStore = useContext(AccountStoreContext);
    const classes = useStyles();

    useEffect(() => {
        Promise.all([
            institutionStore.load(),
            accountStore.load()
        ]);
    }, [institutionStore, accountStore]);

    const getAccounts = institutionId => accountStore.accounts.filter(account => account.institution.id === institutionId);

    const renderAccount = account => (
        <ListItem button key={account.id}>
            <ListItemIcon>
                {getAccountTypeIcon(account.accountType.type)}
            </ListItemIcon>
            <ListItemText primary={account.account} />
        </ListItem>)

    const getAccountTypeIcon = accountType => {
        switch (accountType) {
            case 'Credit':
                return <CreditCardIcon />;
            case 'Savings':
                return <Icon className={classes.icon}>
                    <img src="./piggy-bank.svg" alt="Savings" className={classes.iconImage} />
                </Icon>;
            case 'Checking':
                return <Icon className={classes.icon}>
                    <img src="./check.svg" alt="Checking" className={classes.iconImage} />
                </Icon>;
            case 'Investment':
                return <TrendingUpIcon />;
            default:
                return <AttachMoneyIcon />;
        }
    }

    return institutionStore.institutions.map(institution => {
        console.log(JSON.stringify(institution));
        return (
            <Card key={institution.id} className={classes.card}>
                <CardHeader title={institution.name} />
                <CardContent className={classes.content}>
                    <List>
                        {getAccounts(institution.id).map(renderAccount)}
                    </List>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </CardActions>
            </Card>
        )
    });
});

export default Institutions;