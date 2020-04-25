import React, { useContext, useEffect } from 'react';
import { makeStyles, Dialog, AppBar, Toolbar, IconButton, Slide, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import BudgetGroupIcon from './BudgetGroupIcon';
import TocIcon from '@material-ui/icons/Toc';

const useStyles = makeStyles(theme => ({
    close: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        position: 'relative'
    },
    nested: {
        paddingLeft: theme.spacing(9),
        paddingTop: 0,
        paddingBottom: 0
    },
    title: {
      flexGrow: 1,
    },
}));

const getType = (isSavings, totalAmount) => {
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BudgetModal = observer(({ budget, onClose }) => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);

    useEffect(() => {
        budget.loadCategories()
    }, [budget])

    const groups = budget.categories.reduce((groups, category) => {
        const group = category.budgetCategory.budgetGroup;
        const groupCategories = groups.get(group.id) || { group, categories: [] };
        groupCategories.categories.push(category);
        groups.set(group.id, groupCategories);
        return groups;
    }, new Map());

    const renderedGroups = [];
    groups.forEach((value, key) => {
        const groupTotal = value.categories.reduce((total, category) => total + category.amount, 0);
        renderedGroups.push(
            <>
                <ListItem selected>
                    <ListItemIcon>
                        <BudgetGroupIcon type={getType(value.group.savingsIndicator, groupTotal)} />
                    </ListItemIcon>
                    <ListItemText primary={value.group.name} />
                </ListItem>
                <List disablePadding>
                    {
                        value.categories.map(category =>
                            <ListItem className={classes.nested} >
                                <ListItemText primary={category.budgetCategory.name} />
                            </ListItem>
                        )
                    }
                </List>
            </>
        );
    })

    return (
        <Dialog fullScreen open onClose={onClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} className={classes.close}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {moment(budget.date).format('MMMM YYYY')}
                    </Typography>
                    <IconButton color="inherit" onClick={onClose}>
                        <TocIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {rootStore.loading.has('budgetCategories')
                ? <CircularProgress />
                : < List >
                    {renderedGroups}
                </List>
            }
        </Dialog >
    );
});

export default BudgetModal;

