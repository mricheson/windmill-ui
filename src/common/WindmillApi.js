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

