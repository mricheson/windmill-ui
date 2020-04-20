import React from 'react';
import { Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Accounts from './Accounts/Accounts';

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

    console.log(JSON.stringify(institution));

    return (
        <Card key={institution.id} className={classes.card}>
            <CardHeader title={institution.name} />
            <CardContent className={classes.content}>
                <Accounts institutionId={institution.id} />
            </CardContent>
            <CardActions className={classes.cardAction}>
                <IconButton>
                    <AddIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
});

export default InstitutionCard;