import React, { useContext, useState } from 'react';
import { Slide, Dialog, DialogTitle, DialogContent, useTheme, makeStyles, List, ListItem, ListItemText, TextField, DialogActions, Button, CircularProgress } from '@material-ui/core';
import { TransactionStoreContext } from '../../store/TransactionStore';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AccountStoreContext } from '../../store/AccountStore';
import { RootStoreContext } from '../../store/RootStore';
import Account from '../../store/Account';
import csvParser from 'papaparse';

const useStyle = makeStyles(theme => ({
    root: {
        width: theme.breakpoints.values.sm
    },
    formControl: {
        margin: [[theme.spacing(1), 0, theme.spacing(1), 0]],
    },
    upload: {
        display: 'none'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const upload = (account, transactions) => {
    transactions.forEach(transaction => {

    })
}


const UploadModal = ({ onClose, onSave }) => {
    const theme = useTheme();
    const classes = useStyle();

    const accountStore = useContext(AccountStoreContext);
    const transactionStore = useContext(TransactionStoreContext);
    const rootStore = useContext(RootStoreContext);

    const [account, setAccount] = useState(new Account());
    const [file, setFile] = useState(null);

    const isSaving = rootStore.loading.has('transactionUpload');

    const canSave = account.id != null && file && file.contents;

    const save = () => {
        transactionStore.upload(account, file.contents)
            .then(onSave)
            .then(onClose);
    }

    const onUpload = event => {
        console.log();
        const fileUpload = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(fileUpload);

        reader.onloadend = () => {
            const contents = csvParser.parse(reader.result, { header: true }).data;
            setFile({ name: fileUpload.name, contents });
        }

        setFile({ name: fileUpload.name });
    };

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
            <DialogTitle>Upload CSV</DialogTitle>
            <DialogContent>
                <Autocomplete
                    options={accountStore.accounts}
                    getOptionLabel={account => (account.id != null && `${account.name} (${account.institution.name})`) || ''}
                    renderInput={(params) => <TextField {...params} label="Account" />}
                    value={account}
                    onChange={(event, newValue) => setAccount(newValue)}
                    disabled={isSaving}
                />
                <input
                    accept=".csv"
                    className={classes.upload}
                    id="contained-button-file"
                    type="file"
                    onChange={onUpload}
                />
                <label htmlFor="contained-button-file">
                    <Button component="span">
                        Upload
                    </Button>
                </label>
                {file && file.name}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={isSaving}>
                    Cancel
                </Button>
                <Button onClick={save} color="primary" disabled={isSaving || !canSave}>
                    {isSaving ? <CircularProgress size={theme.typography.fontSize} /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadModal;