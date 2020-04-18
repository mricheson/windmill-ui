import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthenticatonStoreContext } from '../store/AuthenticationStore';
import { makeStyles } from '@material-ui/core';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Transactions from './Transactions/Transactions';
import BudgetList from './Budget/BudgetList';
import BudgetTemplate from './Budget/BudgetTemplate';
import Institutions from './Institutions/Institutions';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
}))

const MainContent = observer(() => {
    const classes = useStyles();
    const { isLoggedIn } = useContext(AuthenticatonStoreContext);
    let location = useLocation();
    let history = useHistory();

    if (!isLoggedIn && location.pathname !== '/') {
        history.push('/');
    }

    return (
        <>
            <div className={classes.offset} />
            <Switch>
                <Route exact path="/transactions">
                    <Transactions />
                </Route>
                <Route exact path="/budgets/open">
                    <BudgetList />
                </Route>
                <Route exact path="/budgets/closed">
                    <BudgetList />
                </Route>
                <Route exact path="/budgets/template">
                    <BudgetTemplate />
                </Route>
                <Route exact path="/institutions">
                    <Institutions />
                </Route>
                <Route exact path="/">
                    {isLoggedIn ? <div>Welcome</div> : <div>Please log in</div>}
                </Route>
            </Switch>
        </>
    );
});

export default MainContent;