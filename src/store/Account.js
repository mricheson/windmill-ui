import { decorate, observable, action } from 'mobx';
import { saveAccount } from '../common/WindmillApi';
import { rootStore } from './RootStore';
import Institution from './Institution';

class Account {
    name = '';
    id = '';
    type = {};
    isActive = false;
    institution = {}

    constructor(newAccount = {}){
        this.populate(newAccount);
    }

    populate = account => {
        this.id = account.id || '';
        this.name = account.account || '';
        this.type = account.accountType || {};
        this.isActive = Boolean(account.activeIndicator);
        this.institution = new Institution(account.institution);
    }

    save = changes => {
        rootStore.startLoading('account');
        return saveAccount({...this, ...changes})
            .then(response => {
                this.populate(response.data);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                rootStore.stopLoading('account');
            });
    }
}

decorate(Account, {
    id: observable,
    name: observable,
    type: observable,
    isActive: observable,
    institution: observable,
    save: action
});

export default Account;