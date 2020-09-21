import axios from 'axios';
import { getCurrentUser, removeCurrentUser, getToken } from './sessionHelpers';

const deleteUser = () => {
    const user = getCurrentUser();
    if (user) {
        const userId = user.id;
        const url = `http://localhost:3001/users/${userId}`;
        const token = getToken();
        const headers = { 'Authorization': token };
        axios.delete(url, { headers })
            .then(res => {
                const { status } = res.data;
                if (status === 200) {
                    removeCurrentUser();
                    return true;
                };
            })
            .catch(err => console.log(err));
    };
};

export { deleteUser };