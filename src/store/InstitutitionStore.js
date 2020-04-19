import { decorate, observable, action } from 'mobx';
import { createContext } from 'react';
import { getInstitutions } from '../common/WindmillApi';

class InstitutionStore {
    institutions = [];

    load = () => getInstitutions()
        .then(response => {
            this.institutions = response.data;
        });
}

decorate(InstitutionStore, {
    institutions: observable,
    load: action
});

export const InstitutionStoreContext = createContext(new InstitutionStore());