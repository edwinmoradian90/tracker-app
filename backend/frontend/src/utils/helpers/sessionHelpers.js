import axios from 'axios';

const authHeader = () => {
    const url = 'user_is_authed';
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
        const url = '/logout';
        const token = getToken();
        const headers = {
            'Authorization': token,
        };
        axios.get(url, { headers })
            .then(res => {
                const { status } = res.data;
                console.log(status, res)
                if (status === 200) {
                    localStorage.removeItem('currentUser');
                };
            })
            .catch(err => console.log(err));
    };
};

const getCurrentUser = () => {
    const getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (getCurrentUser !== null) {
        return getCurrentUser;
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

export {
    authHeader,
    getToken,
    getCurrentUser,
    removeCurrentUser,
    getHeaders,
};