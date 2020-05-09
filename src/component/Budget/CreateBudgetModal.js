import React, { useState } from 'react';
import { Dialog, Slide, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { DatePicker } from "@material-ui/pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateBudgetModal = observer(({ onClose, onCreate }) => {
    const [selectedDate, handleDateChange] = useState(new Date());

    const handleCreate = () => {
        onCreate(selectedDate)
            .then(onClose);
    }

    return (
        <Dialog open onClose={onClose} TransitionComponent={Transition}>
            <DialogTitle >Create New Budget</DialogTitle>
            <DialogContent>
                <DatePicker
                    variant="inline"
                    openTo="month"
                    views={["year", "month"]}
                    label="Year and Month"
                    helperText="Create budget for"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleCreate} color="primary">
                    Create
          </Button>
            </DialogActions>
        </Dialog>
    );
});

export default CreateBudgetModal;

