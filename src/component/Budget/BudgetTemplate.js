import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core';
import AddFooter from '../../common/component/AddFooter';
import BudgetGroupModal from './BudgetGroupModal';
import { observer } from 'mobx-react-lite';
import BudgetGroupObject from '../../store/BudgetGroup';
import { BudgetGroupStoreContext } from '../../store/BudgetGroupStore';
import BudgetGroup from './BudgetGroup';
import { BudgetTemplateStoreContext } from '../../store/BudgetTemplateStore';
import { RootStoreContext } from '../../store/RootStore';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        width: theme.breakpoints.values.md,
        minWidth: theme.breakpoints.values.sm
    }
}));

const BudtgetTemplate = observer(() => {
    const classes = useStyles();
    const budgetGroupStore = useContext(BudgetGroupStoreContext);
    const budgetTemplateStore = useContext(BudgetTemplateStoreContext);
    const rootStore = useContext(RootStoreContext);
    const [modal, setModal] = useState(null);

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
            <AddFooter onAdd={openModal} />
            {modal}
        </div>
    );
});

export default BudtgetTemplate;