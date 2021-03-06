import React, { useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import EditModal from '../../common/component/EditModal';

const InstitutionModal = observer(({ institution, onClose, onSave = () => { }, mode }) => {
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
            title="Institution"
            mode={mode}
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