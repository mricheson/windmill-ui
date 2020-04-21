import { decorate, observable, action } from 'mobx';
import { saveInstitution } from '../common/WindmillApi';
import { rootStore } from './RootStore';

class Institution {
    name = '';
    id = '';

    constructor(newInstitution = {}){
        this.populate(newInstitution);
    }

    populate = institution => {
        this.id = institution.id || '';
        this.name = institution.name || '';
    }

    save = changes => {
        rootStore.startLoading('institution');
        return saveInstitution({...this, ...changes})
            .then(response => {
                this.populate(response.data);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('institution');
            });
    }
}

decorate(Institution, {
    id: observable,
    name: observable,
    save: action
});

export default Institution;