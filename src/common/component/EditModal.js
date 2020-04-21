import React from 'react';
import { Slide, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, useTheme, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    root: {
        width: theme.breakpoints.values.sm
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditModal = ({ onSave, onClose, isSaving, title, children }) => {
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
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={isSaving}>
                    Cancel
                </Button>
                <Button onClick={onSave} color="primary" disabled={isSaving}>
                    {isSaving ? <CircularProgress size={theme.typography.fontSize} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditModal;