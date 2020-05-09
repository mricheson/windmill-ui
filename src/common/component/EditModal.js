import React from 'react';
import { Slide, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, useTheme, makeStyles, FormGroup } from '@material-ui/core';
import clsx from 'clsx';

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

const EditModal = ({ onSave, canSave = true, onClose, isSaving, title, mode = "edit", children }) => {
    const theme = useTheme();
    const classes = useStyle();

    const styleChild = (child, index = 0) => React.cloneElement(child, { className: clsx(classes.formControl, child.props.className), key: index });

    const styledChildren = Array.isArray(children)
        ? children.map(styleChild)
        : styleChild(children);

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
            <DialogTitle>{`${mode.charAt(0).toUpperCase() + mode.slice(1)} ${title}`}</DialogTitle>
            <DialogContent>
                <FormGroup className={classes.formGroup}>
                    {styledChildren}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={isSaving}>
                    Cancel
                </Button>
                <Button onClick={onSave} color="primary" disabled={isSaving || !canSave}>
                    {isSaving ? <CircularProgress size={theme.typography.fontSize} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditModal;