import axios from "axios";
import { rootStore } from '../store/RootStore';

const baseUrl = process.env.REACT_APP_WINDMILL_API_BASE_URL;

const executeApi = (verb, url, body) => axios({
    method: verb,
    url: `${baseUrl}${url}`,
    data: body,
    headers: {
        'Authorization': `Bearer ${rootStore.token}`
    }
});

const get = url => executeApi('get', url, null);
const put = (url, body) => executeApi('put', url, body);
const post = (url, body) => executeApi('post', url, body);

export function getInstitutions() {
    return get('/api/institutions/');
}

export function saveInstitution(institution) {
    return institution.id
        ? put(`/api/institutions/${institution.id}`, institution)
        : post('/api/institutions/', institution);;
}

export function getAccounts() {
    return get('/api/accounts/');
}

export function saveAccount(account) {
    return account.id
        ? put(`/api/accounts/${account.id}`, account)
        : post('/api/accounts/', account);
}

export function getAccountTypes() {
    return get('/api/accounttypes/');
}

export function getBudgetGroups() {
    return get('/api/budgets/groups/');
}

export function saveBudgetGroup(budgetGroup) {
    return budgetGroup.id
        ? put(`/api/budgets/groups/${budgetGroup.id}`, budgetGroup)
        : post('/api/budgets/groups/', budgetGroup);;
}

export function getBudgetCategories() {
    return get(`/api/budgets/categories/`);
}

export function getBudgetTemplates() {
    return get(`/api/budgets/templates/`);
}

export function saveBudgetTemplate(budgetTemplate) {
    return budgetTemplate.id
        ? put(`/api/budgets/templates/${budgetTemplate.id}`, budgetTemplate)
        : post('/api/budgets/templates/', budgetTemplate);;
}

export function createBudget(year, month) {
    return post(`/api/budgets/${year}/${month}`, {});
}

export function getBudgets() {
    return get(`/api/budgets/`);
}

export function getMonthBudgetCategories(year, month) {
    return get(`/api/budgets/${year}/${month}/categories`);
}

export function getTransactions() {
    return get(`/api/transactions`);
}

export function getTransactionForBudget(year, month) {
    return get(`/api/transactions/${year}/${month}`);
}
