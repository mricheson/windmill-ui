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

    constructor(newAccount = {}) {
        this.populate(newAccount);
    }

    populate = account => {
        this.id = account.id || '';
        this.name = account.account || '';
        this.type = account.accountType || {};
        this.isActive = Boolean(account.activeIndicator);
        this.institution = new Institution(account.institution);
    }

    savableObject = root => {
        const result = {};

        if (root.id !== undefined) {
            result.id = root.id;
        }
        if (root.name !== undefined) {
            result.account = root.name;
        }
        if (root.type !== undefined) {
            result.accountType = root.type;
        }
        if (root.institution !== undefined) {
            result.institution = root.institution;
        }
        if (root.isActive !== undefined) {
            result.activeIndicator = root.isActive;
        }

        return result;
    };

    save = changes => {
        const accountToSave = { ...this.savableObject(this), ...this.savableObject(changes) };

        rootStore.startLoading('account');
        return saveAccount(accountToSave)
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