import axios from 'axios';
import { getCurrentUser, removeCurrentUser, getToken } from './sessionHelpers';

const deleteUser = () => {
    const user = getCurrentUser();
    if (user) {
        removeCurrentUser();
        const userId = user.id;
        const url = `/users/${userId}`;
        const token = getToken();
        const headers = { 'Authorization': token };
        axios.delete(url, { headers })
            .then(res => {
                const { status } = res.data;
                if (status === 200) {
                    return true;
                };
            })
            .catch(err => console.log(err));
    };
};

export { deleteUser };