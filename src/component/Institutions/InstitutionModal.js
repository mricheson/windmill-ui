import React, { useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import EditModal from '../../common/component/EditModal';

const InstitutionModal = observer(({ institution, onClose, onSave = () => { }, mode = "edit" }) => {
    const rootStore = useContext(RootStoreContext);
    const [editedName, setEditedName] = useState(institution.name);

    const setName = event => {
        setEditedName(event.target.value);
    }

    const save = () => {
        institution.save({ name: editedName })
            .then(() => onSave(institution))
            .then(onClose);
    }

    const isSaving = rootStore.loading.has('institution');

    return (
        <EditModal
            onSave={save}
            onClose={onClose}
            isSaving={isSaving}
            title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Institution`}
        >
            <TextField
                autoFocus
                label="Name"
                fullWidth
                onChange={setName}
                value={editedName}
                disabled={isSaving}
            />
        </EditModal>
    );
});

export default InstitutionModal;