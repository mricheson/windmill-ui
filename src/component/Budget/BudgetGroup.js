import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles, IconButton, ExpansionPanelActions, InputLabel, CircularProgress, useTheme } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BudgetGroupModal from './BudgetGroupModal';
import AccountIcon from '../Institutions/Accounts/AccountIcon';
import EditIcon from '@material-ui/icons/Edit';
import { BudgetTemplateStoreContext } from '../../store/BudgetTemplateStore';
import AddIcon from '@material-ui/icons/Add';
import BudgetTemplateAmount from './BudgetTemplateAmount';
import BudgetTemplate from '../../store/BudgetTemplate';
import { v4 as uuidv4 } from 'uuid';
import { RootStoreContext } from '../../store/RootStore';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import clsx from 'clsx';

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
        flexDirection: 'column',
        width: '100%'
    },
    actions: {
        justifyContent: 'center'
    },
    labels: {
        width: 'calc(100% - 108px)',
        display: 'flex'
    },
    categoryColumn: {
        width: '33%'
    },
    nameColumn: {
        width: '50%'
    },
    amountColumn: {
        width: '17%'
    },
    income: {
        color: green[900]
    },
    expense: {
        color: red[900]
    }
}));

const getAccountType = (isSavings, totalAmount) => {
    if (isSavings) {
        return 'savings';
    }

    if (totalAmount > 0) {
        return 'income';
    }

    if (totalAmount < 0) {
        return 'expense';
    }

    return '';
}

const BudgetGroup = observer(({ budgetGroup }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [groupModal, setGroupModal] = useState(null);
    const budgetTemplateStore = useContext(BudgetTemplateStoreContext);
    const rootStore = useContext(RootStoreContext);

    const openGroupModal = () => setGroupModal(
        <BudgetGroupModal
            budgetGroup={budgetGroup}
            onClose={() => setGroupModal(null)}
        />
    );

    const templatesForThisGroup = budgetTemplateStore.budgetTemplates.filter(template => template.group.id === budgetGroup.id);
    const renderedTemplates = templatesForThisGroup.map(template => <BudgetTemplateAmount key={template.id} budgetTemplate={template} />);
    const totalAmount = templatesForThisGroup.reduce((total, template) => total + template.amount, 0.0);

    const accountType = getAccountType(budgetGroup.isSavings, totalAmount);

    return (
        <>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <div className={classes.summary}>
                        <div className={classes.column}>
                            <AccountIcon accountType={accountType} />
                            <div className={classes.title}>
                                {budgetGroup.name}
                            </div>
                            <IconButton onClick={openGroupModal}>
                                <EditIcon color="disabled" fontSize="small" />
                            </IconButton>
                        </div>
                        <div className={classes.column}>
                            {rootStore.loading.has('budgetTemplates')
                                ? <CircularProgress size={theme.typography.fontSize} />
                                : <div
                                    className={clsx(totalAmount > 0 ? classes.income : null, totalAmount < 0 ? classes.expense : null)}
                                >
                                    ${Math.abs(totalAmount.toFixed(2))}
                                </div>
                            }
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.templates}>
                        <div className={classes.labels}>
                            <InputLabel className={classes.categoryColumn}>Category</InputLabel>
                            <InputLabel className={classes.nameColumn}>Name</InputLabel>
                            <InputLabel className={classes.amountColumn}>Amount</InputLabel>
                        </div>
                        {renderedTemplates}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelActions className={classes.actions} >
                    <IconButton onClick={() => budgetTemplateStore.budgetTemplates.push(new BudgetTemplate({ id: uuidv4(), group: budgetGroup }))}>
                        <AddIcon />
                    </IconButton>
                </ExpansionPanelActions>
            </ExpansionPanel>
            {groupModal}
        </>
    );

});

export default BudgetGroup;