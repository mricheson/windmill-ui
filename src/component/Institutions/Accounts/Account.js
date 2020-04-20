import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import AccountIcon from './AccountIcon';

const Account = observer(({ account }) => (
    <ListItem button key={account.id}>
        <ListItemIcon>
            <AccountIcon accountType={account.accountType.type} />
        </ListItemIcon>
        <ListItemText primary={account.account} />
    </ListItem>
));

export default Account;