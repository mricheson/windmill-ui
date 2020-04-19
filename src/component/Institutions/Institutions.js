import React, { useEffect, useContext } from 'react';
import { InstitutionStoreContext } from '../../store/InstitutitionStore';

const Institutions = () => {
    const institutionStore = useContext(InstitutionStoreContext);
    
    useEffect(() => {
        institutionStore.load();
    },[institutionStore]);

    return <div>Institutions</div>;
};

export default Institutions;