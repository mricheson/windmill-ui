import React, { useEffect, useContext, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import { RootStoreContext } from '../../store/RootStore';
import { BudgetStoreContext } from '../../store/BudgetStore';
import Budget from './Budget';

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
                    .filter(budget => budget.isReconciled !== open)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(budget => <Budget budget={budget} />)
            }
        </div>
    );
});

export default BudgetList;