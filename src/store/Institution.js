import { decorate, observable, action } from 'mobx';
import { saveInstitution } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import axios from "axios";

class Institution {
    name = '';
    id = '';
    logo = '';

    constructor(newInstitution = {}) {
        this.populate(newInstitution);
    }

    populate = institution => {
        this.id = institution.id;
        this.logo = '';
        this.name = institution.name || '';
    }

    save = changes => {
        rootStore.startLoading('institution');
        return saveInstitution({ ...this, ...changes })
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

    getLogo = () => {
        axios.get(`https://favicongrabber.com/api/grab/${this.name}.com`)
            .then(response => {
                if (response.status === 200 && response.data && response.data.icons && response.data.icons.length > 0) {
                    this.logo = response.data.icons[0].src;
                }
            });
    }
}

decorate(Institution, {
    id: observable,
    name: observable,
    logo: observable,
    save: action,
    getLogo: action
});

export default Institution;