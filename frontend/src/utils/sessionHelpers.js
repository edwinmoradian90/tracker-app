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

export { authHeader };