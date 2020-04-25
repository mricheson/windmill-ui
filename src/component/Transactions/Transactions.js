import React from 'react';
import { useParams } from 'react-router-dom';

const Transactions = () => {
    const { month, year } = useParams();
    return <div>{`Transactions ${year}-${month}`}</div>;
};

export default Transactions;