import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthenticatonStoreContext } from '../store/AuthenticationStore';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

const MainContent = observer(() => {
    const classes = useStyles();
    const { isLoggedIn } = useContext(AuthenticatonStoreContext);

    const content = isLoggedIn ? <div>Welcome</div> : <div>Please log in</div>;
    return (
        <>
            <div className={classes.offset} />
            {content}
        </>
    );
});

export default MainContent;