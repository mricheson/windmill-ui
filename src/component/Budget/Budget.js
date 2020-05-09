import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import BudgetModal from './BudgetModal';

const useStyles = makeStyles(theme => ({
    
}));

const Budget = observer(({ budget }) => {
    const classes = useStyles();
    const [modal, setModal] = useState(null);

    const openModal = () => setModal(
        <BudgetModal
            budget={budget}
            onClose={() => setModal(null)}
        />
    );

    return (
        <>
            <div onClick={openModal}>{budget.date}</div>
            {modal}
        </>
    );
});

export default Budget;