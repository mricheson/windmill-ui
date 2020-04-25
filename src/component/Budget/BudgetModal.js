import React, { useContext } from 'react';
import { makeStyles, Dialog, AppBar, Toolbar, IconButton, Slide, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    close: {
        marginRight: theme.spacing(2),
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BudgetModal = observer(({ budget, onClose }) => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);

    return (
        <Dialog fullScreen open onClose={onClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close" className={classes.close}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        {moment(budget.date).format('MMMM YYYY')}
                    </Typography>
                </Toolbar>
            </AppBar>
            {budget.date}
        </Dialog>
    );
});

export default BudgetModal;

