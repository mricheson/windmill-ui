import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Select, TextField, MenuItem, IconButton, makeStyles } from '@material-ui/core';
import { BudgetCategoryStoreContext } from '../../store/BudgetCategoryStore';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import { BudgetTemplateStoreContext } from '../../store/BudgetTemplateStore';
import { CurrencyFormat } from '../../common/component/Currency';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
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
    inputs: {
        width: 'calc(100% - 108px)'
    },
    amount: {
        '& input': {
            textAlign: 'right'
        }
    }
}));

const BudgetTemplateAmount = observer(({ budgetTemplate }) => {
    const classes = useStyles();
    const budgetCategoryStore = useContext(BudgetCategoryStoreContext);
    const budgetTemplateStore = useContext(BudgetTemplateStoreContext);
    const [editedName, setEditedName] = useState(budgetTemplate.name);
    const [editedAmount, setEditedAmount] = useState(budgetTemplate.amount);
    const [editedCategory, setEditedCategory] = useState(budgetTemplate.category.id);

    const onCategoryChange = event => setEditedCategory(event.target.value);

    const onNameChange = event => setEditedName(event.target.value);

    const onAmountChange = event => setEditedAmount(event.target.value);

    const canClear = editedName !== budgetTemplate.name
        || +editedAmount !== budgetTemplate.amount
        || (editedCategory !== undefined && editedCategory !== budgetTemplate.category.id);

    const canSave = editedCategory !== undefined && canClear;

    const clear = () => {
        setEditedCategory(budgetTemplate.category.id);
        setEditedName(budgetTemplate.name);
        setEditedAmount(budgetTemplate.amount);
    };

    const save = () => {
        budgetTemplate.save({
            id: isNaN(budgetTemplate.id) ? null : budgetTemplate.id,
            name: editedName,
            amount: editedAmount,
            category: budgetCategoryStore.budgetCategories.find(category => category.id === editedCategory)
        })
        .then(() => {
            budgetTemplateStore.load();
        });
    };

    const deleteThis = () => {
        const thisTemplate = budgetTemplateStore.budgetTemplates.find(template => template.id === budgetTemplate.id);
        budgetTemplateStore.budgetTemplates.remove(thisTemplate);
    };

    return (
        <div className={classes.root}>
            <div className={classes.inputs}>
                <Select
                    value={editedCategory}
                    onChange={onCategoryChange}
                    className={classes.categoryColumn}
                    autoWidth
                >
                    {budgetCategoryStore.budgetCategories
                        .filter(category => category.group.id === budgetTemplate.group.id)
                        .map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                </Select>
                <TextField value={editedName} onChange={onNameChange}
                    className={classes.nameColumn} />
                <TextField
                    value={editedAmount}
                    onChange={onAmountChange}
                    name="amount"
                    InputProps={{
                        inputComponent: CurrencyFormat,
                        className: classes.amount
                    }}
                    className={classes.amountColumn}
                />
            </div>
            <IconButton onClick={save} disabled={!canSave} edge="end" >
                <CheckIcon color={canSave ? 'primary' : 'disabled'} fontSize="small" />
            </IconButton>
            <IconButton onClick={clear} disabled={!canClear} edge="end">
                <ClearIcon color={canClear ? 'primary' : 'disabled'} fontSize="small" />
            </IconButton>
            <IconButton onClick={deleteThis} disabled={!isNaN(budgetTemplate.id)}>
                <DeleteIcon color={isNaN(budgetTemplate.id) ? 'primary' : 'disabled'} fontSize="small" />
            </IconButton>
        </div>
    )
});

export default BudgetTemplateAmount;