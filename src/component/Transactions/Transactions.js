import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TransactionStoreContext } from '../../store/TransactionStore';

const Transactions = () => {
    const { month, year } = useParams();
    const transactionStore = useContext(TransactionStoreContext);

    useEffect(() => {
        transactionStore.load(year, month);
    }, [transactionStore]);

    return <div>{`Transactions ${year}-${month}`}</div>;
};

export default Transactions;