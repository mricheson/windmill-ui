import axios from "axios";

const baseUrl = process.env.REACT_APP_WINDMILL_API_BASE_URL;

const executeApi = (verb, url, body) => axios({
    method: verb,
    url: `${baseUrl}${url}`,
    data: body,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
});

const get = url => executeApi('get', url, null);

export function getInstitutions() { return get('/api/institutions/'); }
export function getAccounts() { return get('/api/accounts/'); }
