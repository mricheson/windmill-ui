import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, CardActions, IconButton, Avatar } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Accounts from './Accounts/Accounts';
import EditIcon from '@material-ui/icons/Edit';
import InstitutionModal from './InstitutionModal';
import AccountObject from '../../store/Account';
import AccountModal from './Accounts/AccountModal';
import { AccountStoreContext } from '../../store/AccountStore';

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: 400,
        width: 300,
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column'
    },

    cardAction: {
        justifyContent: 'center'
    },
    content: {
        height: 272,
        overflowY: 'auto'
    }
}))

const InstitutionCard = observer(({ institution }) => {
    const classes = useStyles();
    const accountStore = useContext(AccountStoreContext);
    const [instutionModal, setInstitutionModal] = useState(null);
    const [accountModal, setAccountModal] = useState(null);

    const openInstitutionModal = () => setInstitutionModal(
        <InstitutionModal
            institution={institution}
            onClose={() => setInstitutionModal(null)}
        />
    );

    const openAccountModal = () => setAccountModal(
        <AccountModal
            account={new AccountObject({ institution })}
            onClose={() => setAccountModal(null)}
            onSave={account => accountStore.accounts.push(account)}
            mode="add"
        />
    );

    return (
        <>
            <Card key={institution.id} className={classes.card}>
                <CardHeader
                    title={institution.name}
                    avatar={
                        <Avatar className={classes.avatar}>
                            {institution.name && institution.name.length > 0 && institution.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={openInstitutionModal}>
                            <EditIcon color="disabled" />
                        </IconButton>
                    } />
                <CardContent className={classes.content}>
                    <Accounts institutionId={institution.id} />
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <IconButton onClick={openAccountModal}>
                        <AddIcon />
                    </IconButton>
                </CardActions>
            </Card>
            {instutionModal}
            {accountModal}
        </>
    );
});

export default InstitutionCard;