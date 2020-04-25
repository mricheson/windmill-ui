import React, { useContext } from 'react';
import { makeStyles, Dialog, AppBar, Toolbar, IconButton, Slide } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({

});

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
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                        Sound
                </Toolbar>
            </AppBar>
            {budget.date}
        </Dialog>
    );
});

export default BudgetModal;

