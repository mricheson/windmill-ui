import React, { useContext, useState } from 'react';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../store/RootStore';
import EditModal from '../../../common/component/EditModal';

const AccountModal = observer(({ account, onClose, onSave = () => { } }) => {
    const rootStore = useContext(RootStoreContext);
    const [editedName, setEditedName] = useState(account.name);
    const [editedType, setEditedType] = useState(account.type);
    const [editedIsActive, setEditedIsActive] = useState(account.isActive);

    const onNameChange = event => setEditedName(event.target.value);

    const onIsActiveChange = event => setEditedIsActive(event.target.checked);

    const save = () => {
        account.save({ name: editedName, isActive: editedIsActive })
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