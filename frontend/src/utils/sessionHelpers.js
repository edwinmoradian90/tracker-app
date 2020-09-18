import axios from 'axios';

const authHeader = () => {
    const url = "http://localhost:3001/user_is_authed";
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const headers = {
        "Authorization": `Bearer ${userInfo.token}`,
    };
    axios.get(url, { headers })
        .then(res => console.log(res))
        .catch(err => console.log(err));
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

const getHeaders = token => {
    const headers = {}
    const currentUserToken = JSON.parse(localStorage.getItem('currentUser').token) || '';
    if (token || currentUserToken) {
        headers['Authorization'] = token || currentUserToken;
    };
    return headers;
};


export { authHeader, getToken, removeCurrentUser, getHeaders };