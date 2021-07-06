import axios from 'axios';

const getHeaders = token => {
    const headers = {};
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser !== null || token) {
        headers['Authorization'] = token || currentUser.token;
    };
    return headers;
};

const authHeader = async () => {
    let auth = { result: false, response: '' };
    const headers = getHeaders();
    console.log(headers)
    if (headers) {
        auth['response'] = await axios.get('/user_is_authed', { headers });
        auth['result'] = await auth.response.data.status === 200 ? true : false;
        console.log(auth)
    };
    return auth;
};

const getToken = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
        return JSON.parse(currentUser).token;
    };
};

const removeCurrentUser = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
        localStorage.removeItem('currentUser');
    };
};

const getCurrentUser = () => {
    const getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (getCurrentUser !== null) {
        return getCurrentUser;
    };
};


export {
    authHeader,
    getToken,
    getCurrentUser,
    removeCurrentUser,
    getHeaders,
};