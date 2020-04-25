import React from 'react';
import PaymentIcon from '@material-ui/icons/Payment';
import { Icon, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    iconImage: {
        textAlign: 'center',
        width: 'inherit'
    }
}));

const TransactionIcon = ({ type }) => {
    const classes = useStyles();

    const iconFromFile = (file, alt = '') => (
        <Icon className={classes.icon}>
            <img src={file} alt={alt} className={classes.iconImage} />
        </Icon>
    );

    switch (type.toLowerCase()) {
        case 'payment':
            return <PaymentIcon />;
        case 'reimbursement':
            return iconFromFile('/inside.svg', 'Income');
        case 'reimbursable':
            return iconFromFile('/outside.svg', 'Savings');
        default:
            return null;
    }
}

export default TransactionIcon;