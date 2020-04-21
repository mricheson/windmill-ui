import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import User from './User';
import { List, ListItem, ListItemIcon, ListItemText, Divider, SwipeableDrawer } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import TableChartIcon from '@material-ui/icons/TableChart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { observer } from 'mobx-react-lite';
import MainContent from './MainContent';
import { useHistory, useLocation } from 'react-router-dom';
import BuildIcon from '@material-ui/icons/Build';
import { RootStoreContext } from '../store/RootStore';
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    titleText: {
        cursor: 'pointer',
        width: 'min-content'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    nested: {
        paddingLeft: theme.spacing(12),
    },
    drawerSpacer: {
        paddingLeft: drawerWidth,
    },
    drawerSpacerTransition: {
        transition: [['padding', `${theme.transitions.duration.standard}ms`]]
    }
}));

const Layout = observer(() => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const rootStore = useContext(RootStoreContext);
    const [open, setOpen] = useState(true);

    const toggleMenu = () => setOpen(!open);

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleMenu} disabled={!rootStore.isLoggedIn}>
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.title}>
                        <Typography variant="h6" className={classes.titleText} onClick={() => history.push('/')}>
                            Windmill
                        </Typography>
                    </div>
                    <User />
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={Boolean(open && rootStore.isLoggedIn)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button onClick={() => history.push('/transactions')} selected={location.pathname === '/transactions'}>
                            <ListItemIcon>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Transactions" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <TableChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Budget" />
                        </ListItem>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={() => history.push('/budgets/open')} selected={location.pathname === '/budgets/open'}>
                                <ListItemText primary="Open" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => history.push('/budgets/closed')} selected={location.pathname === '/budgets/closed'}>
                                <ListItemText primary="Closed" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => history.push('/budgets/template')} selected={location.pathname === '/budgets/template'}>
                                <ListItemText primary="Template" />
                            </ListItem>
                        </List>
                        <ListItem button disabled>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mortgate" />
                        </ListItem>
                        <ListItem button onClick={() => history.push('/institutions')} selected={location.pathname === '/institutions'}>
                            <ListItemIcon>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Accounts" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button disabled>
                            <ListItemIcon>
                                <FavoriteIcon />
                            </ListItemIcon>
                            <ListItemText primary="HSA Investments" />
                        </ListItem>
                        <ListItem button disabled>
                            <ListItemIcon>
                                <BeachAccessIcon />
                            </ListItemIcon>
                            <ListItemText primary="401k Plan" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button disabled>
                            <ListItemIcon>
                                <BuildIcon />
                            </ListItemIcon>
                            <ListItemText primary="Maintenance" />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
            <div className={clsx(classes.drawerSpacerTransition, (open & rootStore.isLoggedIn ? classes.drawerSpacer : null))}>
                <MainContent />
            </div>

        </>
    );
});

export default Layout;