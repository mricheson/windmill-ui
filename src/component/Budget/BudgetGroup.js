import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BudgetCategoryStoreContext } from '../../store/BudgetCategoryStore';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BudgetGroupModal from './BudgetGroupModal';
import AccountIcon from '../Institutions/Accounts/AccountIcon';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    summary: {
        display: 'flex'
    },
    column: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        margin: [[0,theme.spacing(2),0,theme.spacing(2)]]
    }
}));

const BudgetGroup = observer(({ budgetGroup }) => {
    const classes = useStyles();
    const [groupModal, setGroupModal] = useState(null);

    const openGroupModal = () => setGroupModal(
        <BudgetGroupModal
            budgetGroup={budgetGroup}
            onClose={() => setGroupModal(null)}
        />
    );

    return (
        <>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={classes.summary}
                >
                    <div className={classes.column}>
                    <AccountIcon accountType={budgetGroup.isSavings ? 'savings' : 'expense'} />
                    <div className={classes.title}>
                        {budgetGroup.name}
                    </div>
                    <IconButton onClick={openGroupModal}>
                        <EditIcon color="disabled"  fontSize="small"/>
                    </IconButton>
                    </div>
                    <div className={classes.column}>

                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {groupModal}
        </>
    );

});

export default BudgetGroup;