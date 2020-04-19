import React from 'react';
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

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    content: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(2)
    }
}))

const MainContent = observer(({ authenticated }) => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    if (!authenticated && location.pathname !== '/') {
        history.push('/');
    }

    return (
        <div >
            <div className={classes.offset} />
            <div className={classes.content}>
                <Switch>
                    <PrivateRoute exact path="/transactions" authenticated={authenticated}>
                        <Transactions />
                    </PrivateRoute>
                    <PrivateRoute exact path="/budgets/open" authenticated={authenticated}>
                        <BudgetList />
                    </PrivateRoute>
                    <PrivateRoute exact path="/budgets/closed" authenticated={authenticated}>
                        <BudgetList />
                    </PrivateRoute>
                    <PrivateRoute exact path="/budgets/template" authenticated={authenticated}>
                        <BudgetTemplate />
                    </PrivateRoute>
                    <PrivateRoute exact path="/institutions" authenticated={authenticated}>
                        <Institutions />
                    </PrivateRoute>
                    <Route exact path="/">
                        {authenticated ? <div>Welcome</div> : <Login authenticated={authenticated} />}
                    </Route>
                    <Route exact path="/oauth2/redirect">
                        <OAuth2RedirectHandler />
                    </Route>
                </Switch>
            </div>
        </div>
    );
});

export default MainContent;