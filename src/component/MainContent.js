import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Transactions from './Transactions/Transactions';
import BudgetList from './Budget/BudgetList';
import BudgetTemplate from './Budget/BudgetTemplate';
import Institutions from './Institutions/Institutions';
import Login from './Security/Login';
import PrivateRoute from './Security/PrivateRoute';
import OAuth2RedirectHandler from './Security/OAuth2RedirectHandler';
import { RootStoreContext } from '../store/RootStore';
import { AccountTypeStoreContext } from '../store/AccountTypeStore';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    content: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(2)
    }
}))

const MainContent = observer(() => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const rootStore = useContext(RootStoreContext);
    const accountTypeStore = useContext(AccountTypeStoreContext);

    if (!rootStore.isLoggedIn && location.pathname !== '/') {
        history.push('/');
    }

    useEffect(() => {
        if(rootStore.isLoggedIn){
            accountTypeStore.load();
        } else {
            accountTypeStore.accountTypes = [];
        }

    }, [rootStore.isLoggedIn, accountTypeStore])

    return (
        <div >
            <div className={classes.offset} />
            <div className={classes.content}>
                <Switch>
                    <PrivateRoute exact path="/transactions">
                        <Transactions />
                    </PrivateRoute>
                    <PrivateRoute exact path="/budgets/open">
                        <BudgetList />
                    </PrivateRoute>
                    <PrivateRoute exact path="/budgets/closed">
                        <BudgetList />
                    </PrivateRoute>
                    <PrivateRoute exact path="/budgets/template">
                        <BudgetTemplate />
                    </PrivateRoute>
                    <PrivateRoute exact path="/institutions">
                        <Institutions />
                    </PrivateRoute>
                    <Route exact path="/">
                        {rootStore.isLoggedIn ? <div>Welcome</div> : <Login />}
                    </Route>
                    <Route exact path="/oauth2/redirect">
                        <OAuth2RedirectHandler />
                    </Route>
                </Switch>
            </div>
            <div className={classes.offset} />
        </div>
    );
});

export default MainContent;