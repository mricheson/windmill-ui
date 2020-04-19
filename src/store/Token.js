
const ACCESS_TOKEN = 'accessToken';

export const getToken = () => localStorage.getItem(ACCESS_TOKEN) || '';

export const setToken = token => {
    localStorage.setItem(ACCESS_TOKEN, token);
}

export const isLoggedIn = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return Boolean(token && token.length > 0);
}
