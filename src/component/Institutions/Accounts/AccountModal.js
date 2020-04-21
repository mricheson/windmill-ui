import React, { useContext, useState } from 'react';
import { TextField, FormControlLabel, Checkbox, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../store/RootStore';
import EditModal from '../../../common/component/EditModal';
import { AccountTypeStoreContext } from '../../../store/AccountTypeStore';

const AccountModal = observer(({ account, onClose, onSave = () => { } }) => {
    const rootStore = useContext(RootStoreContext);
    const accountTypeStore = useContext(AccountTypeStoreContext);
    const [editedName, setEditedName] = useState(account.name);
    const [editedType, setEditedType] = useState(account.type.id);
    const [editedIsActive, setEditedIsActive] = useState(account.isActive);

    const onNameChange = event => setEditedName(event.target.value);

    const onIsActiveChange = event => setEditedIsActive(event.target.checked);

    const onTypeChange = event => setEditedType(event.target.value);

    const save = () => {
        account.save({
            name: editedName,
            isActive: editedIsActive,
            type: editedType
                ? accountTypeStore.accountTypes.find(type => type.id === editedType)
                : undefined
        })
            .then(() => onSave(account))
            .then(onClose);
    }

    const isSaving = rootStore.loading.has('account');

    return (
        <EditModal onSave={save} onClose={onClose} isSaving={isSaving} title="Edit Account">
            <TextField
                autoFocus
                label="Name"
                fullWidth
                onChange={onNameChange}
                value={editedName}
                disabled={isSaving}
            />
            <FormControl>
                <InputLabel shrink>
                    Type
                </InputLabel>
                <Select
                    value={editedType}
                    onChange={onTypeChange}
                >
                    {accountTypeStore.accountTypes.map(type => <MenuItem key={type.id} value={type.id}>{type.type}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        disabled={isSaving}
                        value={editedIsActive}
                        checked={editedIsActive}
                        onChange={onIsActiveChange}
                    />
                }
                label="Active"
            />
        </EditModal>
    );
});

export default AccountModal;