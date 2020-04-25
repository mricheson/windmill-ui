import React, { useEffect, useContext, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import { RootStoreContext } from '../../store/RootStore';
import { BudgetStoreContext } from '../../store/BudgetStore';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
    }
}));

const BudgetList = observer(({ open = false }) => {
    const budgetStore = useContext(BudgetStoreContext);
    const rootStore = useContext(RootStoreContext);
    const classes = useStyles();

    useEffect(() => {
        budgetStore.load()
    }, [budgetStore]);

    if (rootStore.loading.has('budgets')) {
        return <CircularProgress />;
    }

    return (
        <div className={classes.root}>
            {
                budgetStore.budgets
                    .filter(budget => budget.reconciledIndicator !== open)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(budget => <div>{budget.date}</div>)
            }
        </div>
    );
});

export default BudgetList;