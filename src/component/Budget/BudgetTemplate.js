import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, CircularProgress, Fab } from '@material-ui/core';
import AddFooter from '../../common/component/AddFooter';
import BudgetGroupModal from './BudgetGroupModal';
import { observer } from 'mobx-react-lite';
import BudgetGroupObject from '../../store/BudgetGroup';
import { BudgetGroupStoreContext } from '../../store/BudgetGroupStore';
import BudgetGroup from './BudgetGroup';
import { BudgetTemplateStoreContext } from '../../store/BudgetTemplateStore';
import { RootStoreContext } from '../../store/RootStore';
import LaunchIcon from '@material-ui/icons/Launch';
import CreateBudgetModal from './CreateBudgetModal';
import { BudgetStoreContext } from '../../store/BudgetStore';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        width: theme.breakpoints.values.md,
        minWidth: theme.breakpoints.values.sm
    },
    total: {
        margin: [[24, 52]],
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 900
    },
    income: {
        color: green[900]
    },
    expense: {
        color: red[900]
    }
}));

const BudtgetTemplate = observer(() => {
    const classes = useStyles();
    const budgetGroupStore = useContext(BudgetGroupStoreContext);
    const budgetTemplateStore = useContext(BudgetTemplateStoreContext);
    const budgetStore = useContext(BudgetStoreContext);
    const rootStore = useContext(RootStoreContext);
    const [modal, setModal] = useState(null);
    const [createBudgetModal, setCreateBudgetModal] = useState(null);

    useEffect(() => {
        Promise.all([
            budgetGroupStore.load(),
            budgetTemplateStore.load()
        ]);
    }, [budgetGroupStore, budgetTemplateStore]);

    const openModal = () => setModal(
        <BudgetGroupModal
            budgetGroup={new BudgetGroupObject()}
            onClose={() => setModal(null)}
            onSave={budgetGroup => budgetGroupStore.budgetGroups.push(budgetGroup)}
            mode="add"
            nextPosition={budgetGroupStore.budgetGroups.length}
        />
    );

    const openCreateBudgetModal = () => setCreateBudgetModal(
        <CreateBudgetModal
            onClose={() => setCreateBudgetModal(null)}
            onCreate={date => budgetStore.create(date.getFullYear(), date.getMonth() + 1)}
        />
    );

    const createNewMonthBudget = (
        <Fab onClick={openCreateBudgetModal}>
            <LaunchIcon />
        </Fab>
    );

    const total = budgetTemplateStore.budgetTemplates.reduce((sum, template) => sum + template.amount, 0).toFixed(2)

    if (rootStore.loading.has('budgetGroups')) {
        return <CircularProgress />;
    }

    return (
        <div className={classes.root}>
            {
                budgetGroupStore.budgetGroups.slice()
                    .sort((a, b) => a.position - b.position)
                    .map(group => <BudgetGroup key={group.id} budgetGroup={group} />)
            }
            {
                budgetTemplateStore.budgetTemplates.length > 0
                    ? <div className={classes.total}>
                        <div>Total</div>
                        <div className={clsx(total > 0 ? classes.income : null, total < 0 ? classes.expense : null)}>
                            ${Math.abs(total)}
                        </div>
                    </div>
                    : null
            }
            <AddFooter onAdd={openModal} right={createNewMonthBudget} />
            {modal}
            {createBudgetModal}
        </div>
    );
});

export default BudtgetTemplate;