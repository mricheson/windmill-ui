import React, { useContext, useState } from 'react';
import { Slide, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, useTheme, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';

const useStyle = makeStyles(theme =>({
    root: {
        width: theme.breakpoints.values.sm
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Account = observer(({ institution, onClose }) => {
    const theme = useTheme();
    const classes = useStyle();
    const rootStore = useContext(RootStoreContext);
    const [editedName, setEditedName] = useState(institution.name);

    const setName = event => {
        setEditedName(event.target.value);
    }

    const save = () => {
        institution.save({ name: editedName })
            .then(onClose);
    }

    const isSaving = rootStore.loading.has('institution');

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
            <DialogTitle>Edit Institution</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="Name"
                    fullWidth
                    onChange={setName}
                    value={editedName}
                    disabled={isSaving}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={isSaving}>
                    Cancel
                </Button>
                <Button onClick={save} color="primary" disabled={isSaving}>
                    {isSaving ? <CircularProgress size={theme.typography.fontSize} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default Account;