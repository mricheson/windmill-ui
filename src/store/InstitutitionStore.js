import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getInstitutions } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import Institution from './Institution';

class InstitutionStore {
    institutions = [];

    load = () => {
        rootStore.startLoading('institutions');
        return getInstitutions()
            .then(response => {
                this.institutions = response.data.map(institution => new Institution(institution));
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