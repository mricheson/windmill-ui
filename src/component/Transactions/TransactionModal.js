import React, { useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import EditModal from '../../common/component/EditModal';

const TransactionModal = observer(({ transaction, onClose, onSave = () => { }, mode }) => {
    const rootStore = useContext(RootStoreContext);
    const [editedName, setEditedName] = useState(transaction.description);

    const setName = event => {
        setEditedName(event.target.value);
    }

    const save = () => {
        transaction.save({ name: editedName })
            .then(() => onSave(transaction))
            .then(onClose);
    }

    const isSaving = rootStore.loading.has('transaction');

    return (
        <EditModal
            onSave={save}
            onClose={onClose}
            isSaving={isSaving}
            title="Transaction"
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

export default TransactionModal;