import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemIcon, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import AccountIcon from './AccountIcon';
import AccountModal from './AccountModal';

const useStyle = makeStyles({
    inActive: {
        textDecoration: 'line-through'
    }
});
const Account = observer(({ account }) => {
    const classes = useStyle();
    const [modal, setModal] = useState(null);

    const openModal = () => setModal(<AccountModal account={account} onClose={() => setModal(null)} />);

    return (
        <ListItem button key={account.id} onClick={openModal}>
            <ListItemIcon>
                <AccountIcon accountType={account.type.type} />
            </ListItemIcon>
            <ListItemText primary={account.name} className={account.isActive ? null : classes.inActive}/>
            {modal}
        </ListItem>
    );
});

export default Account;