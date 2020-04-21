import React, { useContext, useState } from 'react';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../store/RootStore';
import EditModal from '../../common/component/EditModal';

const BudgetGroupModal = observer(({ budgetGroup, onClose, onSave = () => { }, mode, nextPosition }) => {
    const rootStore = useContext(RootStoreContext);
    const [editedName, setEditedName] = useState(budgetGroup.name);
    const [editedIsSaving, setEditedIsSavings] = useState(budgetGroup.isSavings);

    const setName = event => setEditedName(event.target.value);

    const onIsSavingsChange = event => setEditedIsSavings(event.target.checked);

    const save = () => {
        budgetGroup.save({
            name: editedName,
            isSavings: editedIsSaving,
            position: nextPosition
        })
            .then(() => onSave(budgetGroup))
            .then(onClose);
    }

    const isSaving = rootStore.loading.has('budgetGroup');

    return (
        <EditModal
            onSave={save}
            onClose={onClose}
            isSaving={isSaving}
            title="Group"
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
            <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        disabled={isSaving}
                        value={editedIsSaving}
                        checked={editedIsSaving}
                        onChange={onIsSavingsChange}
                    />
                }
                label="Savings"
            />
        </EditModal>
    );
});

export default BudgetGroupModal;