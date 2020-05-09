import React, { useEffect, useContext, useState } from 'react';
import { InstitutionStoreContext } from '../../store/InstitutitionStore';
import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import { AccountStoreContext } from '../../store/AccountStore';
import { RootStoreContext } from '../../store/RootStore';
import Institution from './Institution';
import AddFooter from '../../common/component/AddFooter';
import InstitutionModal from './InstitutionModal';
import InstitutionObject from '../../store/Institution';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}));

const Institutions = observer(() => {
    const institutionStore = useContext(InstitutionStoreContext);
    const accountStore = useContext(AccountStoreContext);
    const rootStore = useContext(RootStoreContext);
    const classes = useStyles();
    const [modal, setModal] = useState(null);

    useEffect(() => {
        Promise.all([
            institutionStore.load(),
            accountStore.load()
        ]);
    }, [institutionStore, accountStore]);

    const openModal = () => setModal(
        <InstitutionModal
            institution={new InstitutionObject()}
            onClose={() => setModal(null)}
            onSave={institution => institutionStore.institutions.push(institution)}
            mode="add"
        />
    );

    if (rootStore.loading.has('institutions')) {
        return <CircularProgress />;
    }

    return (
        <div className={classes.root}>
            {
                institutionStore.institutions.slice()
                    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                    .map(institution => <Institution key={institution.id} institution={institution} />)
            }
            <AddFooter onAdd={openModal} />
            {modal}
        </div>
    );
});

export default Institutions;