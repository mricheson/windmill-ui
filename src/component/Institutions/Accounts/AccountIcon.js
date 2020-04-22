import React from 'react';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Icon, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    iconImage: {
        textAlign: 'center'
    }
}));

const AccountIcon = ({ accountType }) => {
    const classes = useStyles();

    const iconFromFile = (file, alt = '') => (
        <Icon className={classes.icon}>
            <img src={file} alt={alt} className={classes.iconImage} />
        </Icon>
    );

    switch (accountType.toLowerCase()) {
        case 'credit':
            return <CreditCardIcon />;
        case 'savings':
            return iconFromFile('/piggy-bank.svg', 'Savings');
        case 'checking':
        case 'expense':
            return iconFromFile('/check.svg', 'Checking');
        case 'investment':
            return <TrendingUpIcon />;
        default:
            return <AttachMoneyIcon />;
    }
}

export default AccountIcon;