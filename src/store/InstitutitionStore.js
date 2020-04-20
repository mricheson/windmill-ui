import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getInstitutions } from '../common/WindmillApi';
import { rootStore } from './RootStore';

class InstitutionStore {
    institutions = [];

    load = () => {
        rootStore.startLoading('institutions');
        return getInstitutions()
            .then(response => {
                this.institutions = response.data;
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('institutions');
            });
    }
}

decorate(InstitutionStore, {
    institutions: observable,
    load: action
});

export const InstitutionStoreContext = createContext(new InstitutionStore());