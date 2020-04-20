import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../store/RootStore';
import { Button, makeStyles } from '@material-ui/core';
import { GOOGLE_AUTH_URL } from './Security/Login';

const useStyles = makeStyles(theme => ({
    button: {
        color: theme.palette.common.white
    }
}));

const User = observer(() => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);

    return rootStore.isLoggedIn
        ? <Button className={classes.button} onClick={() => rootStore.setToken('')}>Sign Out</Button>
        : <Button className={classes.button} href={GOOGLE_AUTH_URL}>Sign In</Button>
});

export default User;