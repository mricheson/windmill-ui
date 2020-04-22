import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles, IconButton, ExpansionPanelActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BudgetGroupModal from './BudgetGroupModal';
import AccountIcon from '../Institutions/Accounts/AccountIcon';
import EditIcon from '@material-ui/icons/Edit';
import { BudgetTemplateStoreContext } from '../../store/BudgetTemplateStore';
import AddIcon from '@material-ui/icons/Add';
import BudgetTemplateAmount from './BudgetTemplateAmount';
import BudgetTemplate from '../../store/BudgetTemplate';

const useStyles = makeStyles(theme => ({
    summary: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    column: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        margin: [[0, theme.spacing(2), 0, theme.spacing(2)]]
    },
    templates: {
        display: 'flex',
        flexDirection: 'column'
    },
    actions: {
        justifyContent: 'center'
    }
}));

const BudgetGroup = observer(({ budgetGroup }) => {
    const classes = useStyles();
    const [groupModal, setGroupModal] = useState(null);
    const budgetTemplateStore = useContext(BudgetTemplateStoreContext);

    const openGroupModal = () => setGroupModal(
        <BudgetGroupModal
            budgetGroup={budgetGroup}
            onClose={() => setGroupModal(null)}
        />
    );

    const templatesForThisGroup = budgetTemplateStore.budgetTemplates.filter(template => template.group.id === budgetGroup.id);
    const renderedTemplates = templatesForThisGroup.map(template => <BudgetTemplateAmount budgetTemplate={template} />);
    const totalAmount = templatesForThisGroup.reduce((total, template) => total + template.amount, 0.0);

    return (
        <>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <div className={classes.summary}>
                        <div className={classes.column}>
                            <AccountIcon accountType={budgetGroup.isSavings ? 'savings' : 'expense'} />
                            <div className={classes.title}>
                                {budgetGroup.name}
                            </div>
                            <IconButton onClick={openGroupModal}>
                                <EditIcon color="disabled" fontSize="small" />
                            </IconButton>
                        </div>
                        <div className={classes.column}>
                            {`$${totalAmount.toFixed(2)}`}
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.templates}>
                        {renderedTemplates}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelActions className={classes.actions} >
                    <IconButton onClick={() => budgetTemplateStore.budgetTemplates.push(new BudgetTemplate({ group: budgetGroup }))}>
                        <AddIcon />
                    </IconButton>
                </ExpansionPanelActions>
            </ExpansionPanel>
            {groupModal}
        </>
    );

});

export default BudgetGroup;