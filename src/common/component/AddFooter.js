import React, { useContext } from 'react';
import { AppBar, Toolbar, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { DRAWER_WIDTH, RootStoreContext } from '../../store/RootStore';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles(theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    drawerSpacer: {
        paddingLeft: DRAWER_WIDTH,
    },
    drawerSpacerTransition: {
        transition: [['padding', `${theme.transitions.duration.standard}ms`]]
    }
}));

const AddFooter = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const classes = useStyles();

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <div className={clsx(classes.drawerSpacerTransition, (rootStore.drawerOpen & rootStore.isLoggedIn ? classes.drawerSpacer : null))}>
                <Toolbar>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                        <AddIcon />
                    </Fab>
                    <div className={classes.grow} />
                </Toolbar>
            </div>
        </AppBar>
    );
});

export default AddFooter;