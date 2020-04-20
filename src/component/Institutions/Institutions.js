import React, { useEffect, useContext } from 'react';
import { InstitutionStoreContext } from '../../store/InstitutitionStore';
import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core';
import { AccountStoreContext } from '../../store/AccountStore';
import { RootStoreContext } from '../../store/RootStore';
import Institution from './Institution';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}))

const Institutions = observer(() => {
    const institutionStore = useContext(InstitutionStoreContext);
    const accountStore = useContext(AccountStoreContext);
    const rootStore = useContext(RootStoreContext);
    const classes = useStyles();

    useEffect(() => {
        Promise.all([
            institutionStore.load(),
            accountStore.load()
        ]);
    }, [institutionStore, accountStore]);

    if (rootStore.loading.has('institutions')) {
        return <CircularProgress />;
    }

    return (
        <div className={classes.root}>
            {
                institutionStore.institutions
                    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                    .map(institution => <Institution key={institution.id} institution={institution} />)
            }
        </div>
    );
});

export default Institutions;