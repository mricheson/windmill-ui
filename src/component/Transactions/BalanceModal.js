import React from 'react';
import { Slide, Dialog, DialogTitle, DialogContent, useTheme, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    root: {
        width: theme.breakpoints.values.sm
    },
    formControl: {
        margin: [[theme.spacing(1), 0, theme.spacing(1), 0]],
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BalanceModal = ({ onSave, canSave = true, onClose, isSaving, title, mode = "edit", children }) => {
    const theme = useTheme();
    const classes = useStyle();



    return (
        <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            PaperProps={{
                className: classes.root
            }}
        >
            <DialogTitle>Month's Balances</DialogTitle>
            <DialogContent>
            </DialogContent>
        </Dialog>
    );
};

export default BalanceModal;