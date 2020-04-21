import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, IconButton, Avatar } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Accounts from './Accounts/Accounts';
import EditIcon from '@material-ui/icons/Edit';
import InstitutionModal from './InstitutionModal';

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
    const [modal, setModal] = useState(null);

    const openModal = () => setModal(<InstitutionModal institution={institution} onClose={() => setModal(null)} />);

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
                        <IconButton onClick={openModal}>
                            <EditIcon color="disabled" />
                        </IconButton>
                    } />
                <CardContent className={classes.content}>
                    <Accounts institutionId={institution.id} />
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </CardActions>
            </Card>
            {modal}
        </>
    );
});

export default InstitutionCard;