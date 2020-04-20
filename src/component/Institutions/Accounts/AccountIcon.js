import React from 'react';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Icon, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    icon: {
        height: '100%'
    },
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
    
    switch (accountType) {
        case 'Credit':
            return <CreditCardIcon />;
        case 'Savings':
            return iconFromFile('./piggy-bank.svg', 'Savings');
        case 'Checking':
            return iconFromFile('./check.svg', 'Checking');
        case 'Investment':
            return <TrendingUpIcon />;
        default:
            return <AttachMoneyIcon />;
    }
}

export default AccountIcon;