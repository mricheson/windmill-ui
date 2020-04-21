import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import AddFooter from '../../common/component/AddFooter';
import BudgetGroupModal from './BudgetGroupModal';
import { observer } from 'mobx-react-lite';
import BudgetGroupObject from '../../store/BudgetGroup';
import { BudgetGroupStoreContext } from '../../store/BudgetGroupStore';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}));

const BudtgetTemplate = observer(() => {
    const classes = useStyles();
    const budgetGroupStore = useContext(BudgetGroupStoreContext);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        budgetGroupStore.load();
    }, [budgetGroupStore]);

    const openModal = () => setModal(
        <BudgetGroupModal
            budgetGroup={new BudgetGroupObject()}
            onClose={() => setModal(null)}
            onSave={budgetGroup => budgetGroupStore.budgetGroups.push(budgetGroup)}
            mode="add"
            nextPosition={budgetGroupStore.budgetGroups.length}
        />
    );

    return (
        <div className={classes.root}>
            {
                budgetGroupStore.budgetGroups.slice()
                    .sort((a, b) => a.position <= b.position)
                    .map(group => group.name)
            }
            <AddFooter onAdd={openModal} />
            {modal}
        </div>
    );
});

export default BudtgetTemplate;